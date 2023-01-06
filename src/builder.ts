import {
  TypedDataDomain,
  TypedDataSigner,
} from '@ethersproject/abstract-signer';
import {
  BigNumber,
  ethers,
  PopulatedTransaction,
  Signature,
  Signer,
  utils,
} from 'ethers';
import { MevTx, MevWalletV0, MEV_TX_TYPES, SignedMevTx } from '.';
import { serializeMevTx } from './utils';
import { MevWalletV0Abi__factory } from './bindings';

export const ERR_ALREADY_COMPLETE =
  'Tx has been built. Further modifications not permitted.';

export const MUST_ADD_TO =
  'Must provide `to` address. Contract creation not yet supported';

export function domainFor(
  chainId: number,
  verifyingContract: string,
): TypedDataDomain {
  return {
    name: 'MevTx',
    version: '1',
    verifyingContract,
    chainId,
  };
}

export class MevTxBuilder {
  private _built?: MevTx;
  private _signed?: SignedMevTx;
  private _sig?: Signature;

  private _tx: Partial<MevTx>;
  private _notBefore?: ethers.BigNumber;
  private _deadline?: ethers.BigNumber;
  private _provider: ethers.providers.Provider;
  private _wallet: MevWalletV0;

  constructor(
    wallet: string,
    provider: ethers.providers.Provider,
    tx?: Partial<MevTx>,
  ) {
    this._provider = provider;
    this._wallet = MevWalletV0Abi__factory.connect(wallet, provider);
    this._tx = tx ?? {};
  }

  public get to(): string | undefined {
    return this._tx.to;
  }

  public set to(value: string | undefined) {
    if (this._built) throw new Error(ERR_ALREADY_COMPLETE);
    this._tx.to = value;
  }

  public get data(): string | undefined {
    return this._tx.data;
  }

  public set data(value: string | undefined) {
    if (this._built) throw new Error(ERR_ALREADY_COMPLETE);
    this._tx.data = value;
  }

  public get value(): BigNumber | undefined {
    return this._tx.value;
  }

  public set value(value: BigNumber | undefined) {
    if (this._built) throw new Error(ERR_ALREADY_COMPLETE);
    this._tx.value = value;
  }

  public get delegate(): boolean | undefined {
    return this._tx.delegate;
  }

  public set delegate(value: boolean | undefined) {
    if (this._built) throw new Error(ERR_ALREADY_COMPLETE);
    this._tx.delegate = value;
  }

  public get tip(): BigNumber | undefined {
    return this._tx.tip;
  }

  public set tip(value: BigNumber | undefined) {
    if (this._built) throw new Error(ERR_ALREADY_COMPLETE);
    this._tx.tip = value;
  }

  public get maxBaseFee(): BigNumber | undefined {
    return this._tx.maxBaseFee;
  }

  public set maxBaseFee(value: BigNumber | undefined) {
    if (this._built) throw new Error(ERR_ALREADY_COMPLETE);
    this._tx.maxBaseFee = value;
  }

  private setTiming() {
    const nb = this.notBefore ?? BigNumber.from(0);
    const dl = this.deadline ?? BigNumber.from(0);

    this._tx.timing = nb.shl(64).or(dl);
  }

  public get notBefore(): BigNumber | undefined {
    return this._notBefore;
  }

  public set notBefore(value: BigNumber | undefined) {
    if (this._built) throw new Error(ERR_ALREADY_COMPLETE);
    this._notBefore = value;
    this.setTiming();
  }

  public get deadline(): BigNumber | undefined {
    return this._deadline;
  }

  public set deadline(value: BigNumber | undefined) {
    if (this._built) throw new Error(ERR_ALREADY_COMPLETE);
    this._deadline = value;
    this.setTiming();
  }

  public get nonce(): BigNumber | undefined {
    return this._tx.nonce;
  }

  public set nonce(value: BigNumber | undefined) {
    if (this._built) throw new Error(ERR_ALREADY_COMPLETE);
    this._tx.nonce = value;
  }

  public get wallet(): string {
    return this._wallet.address;
  }

  public set wallet(value: string) {
    this._wallet = MevWalletV0Abi__factory.connect(value, this.provider);
  }

  public get provider(): ethers.providers.Provider {
    return this._provider;
  }

  public set provider(value: ethers.providers.Provider) {
    this._provider = value;
    this._wallet = MevWalletV0Abi__factory.connect(this._wallet.address, value);
  }

  missingKeys(): ReadonlyArray<string> {
    const keys = [];
    if (!('to' in this._tx) || this._tx.to === undefined) keys.push('to');
    if (!('data' in this._tx) || this._tx.data === undefined) keys.push('data');
    if (!('value' in this._tx) || this._tx.value === undefined)
      keys.push('value');
    if (!('delegate' in this._tx) || this._tx.delegate === undefined)
      keys.push('delegate');
    if (!('tip' in this._tx) || this._tx.tip === undefined) keys.push('tip');
    if (!('maxBaseFee' in this._tx) || this._tx.maxBaseFee === undefined)
      keys.push('maxBaseFee');
    if (!('timing' in this._tx) || this._tx.timing === undefined)
      keys.push('timing');
    if (!('nonce' in this._tx) || this._tx.nonce === undefined)
      keys.push('nonce');
    return keys;
  }

  async populateBaseFee(): Promise<void> {
    const feeData = await this.provider.getFeeData();
    if (!feeData.maxFeePerGas || !feeData.maxPriorityFeePerGas)
      throw new Error('Missing 1559 data');
    if (!this.maxBaseFee) this.maxBaseFee = feeData.maxFeePerGas;
  }

  async populateTiming(): Promise<void> {
    if (this.notBefore && this.deadline) return;

    const block = await this.provider.getBlock('latest');
    const timestamp: number = block.timestamp;
    const offset = timestamp + 60 * 10;

    if (!this.deadline || this.deadline.lt(timestamp))
      this.deadline = BigNumber.from(offset);

    if (!this.notBefore || this.notBefore.gt(timestamp))
      this.notBefore = BigNumber.from(timestamp);

    this.setTiming();
  }

  async populateNonce(): Promise<void> {
    if (this.nonce) return;
    const nonce = await this._wallet.nonce();
    this.nonce = nonce;
  }

  async populateTip(): Promise<void> {
    if (this.tip) return;
    const gasPrice = await this.provider.getGasPrice();
    this.tip = gasPrice.mul(21_000);
  }

  async complete(): Promise<MevTx> {
    if (this._built) return this._built;

    if (!this.to) throw new Error(MUST_ADD_TO);
    if (!this.data) this.data = '0x';
    if (!this.value) this.value = BigNumber.from(0);
    if (!this.delegate) this.delegate = false;
    // TODO: determine a reasonable value
    if (!this.tip) this.tip = utils.parseUnits('1000', 'gwei');

    await Promise.all([
      this.populateBaseFee(),
      this.populateTiming(),
      this.populateNonce(),
    ]);

    const missing = this.missingKeys();
    if (missing.length != 0) {
      throw new Error(
        `Tx Not Populated. Missing keys: [${missing.join(', ')}]`,
      );
    }

    // for the type checker
    if (
      !('to' in this._tx) ||
      this._tx.to === undefined ||
      !('data' in this._tx) ||
      this._tx.data === undefined ||
      !('value' in this._tx) ||
      this._tx.value === undefined ||
      !('delegate' in this._tx) ||
      this._tx.delegate === undefined ||
      !('tip' in this._tx) ||
      this._tx.tip === undefined ||
      !('maxBaseFee' in this._tx) ||
      this._tx.maxBaseFee === undefined ||
      !('timing' in this._tx) ||
      this._tx.timing === undefined ||
      !('nonce' in this._tx) ||
      this._tx.nonce === undefined
    )
      throw new Error('unreachable. checked by missingkeys');

    this._built = {
      to: this._tx.to,
      data: this._tx.data,
      value: this._tx.value,
      delegate: this._tx.delegate,
      tip: this._tx.tip,
      maxBaseFee: this._tx.maxBaseFee,
      timing: this._tx.timing,
      nonce: this._tx.nonce,
    };
    return this._built;
  }

  async sign(signer: Signer & TypedDataSigner): Promise<SignedMevTx> {
    if (this._signed) return this._signed;

    const tx = await this.complete();
    const sender = await this._wallet.owner();
    const signerAddr = await signer.getAddress();
    if (signerAddr !== sender)
      throw new Error(`Wrong Signer. Got ${signerAddr}, needed ${sender}`);
    const domain = domainFor(await signer.getChainId(), this.wallet);
    const signature = await signer._signTypedData(domain, MEV_TX_TYPES, tx);
    if (!this._sig) this._sig = utils.splitSignature(signature);

    const ser = serializeMevTx(tx) as SignedMevTx;
    ser.v = this._sig.v;
    ser.r = this._sig.r;
    ser.s = this._sig.s;
    this._signed = ser;

    return ser;
  }

  async prepSend(
    overrides?: ethers.PayableOverrides & { from?: string },
    signWith?: Signer & TypedDataSigner,
  ): Promise<PopulatedTransaction> {
    if (!this._signed) {
      if (signWith) {
        await this.sign(signWith);
      } else {
        throw new Error('Must sign before sending');
      }
    }
    if (!this._signed) throw new Error('Unreachable');

    const or = overrides ?? {};
    or.value = this._signed.value;

    return await this._wallet.populateTransaction.mevTx(
      this._signed.to,
      this._signed.data,
      this._signed.value,
      this._signed.delegate,
      this._signed.tip,
      this._signed.maxBaseFee,
      this._signed.timing,
      this._signed.nonce,
      this._signed.v,
      this._signed.r,
      this._signed.s,
      overrides ?? {},
    );
  }

  async send(
    sender: Signer,
    overrides?: ethers.PayableOverrides & { from?: string },
    signWith?: Signer & TypedDataSigner,
  ): Promise<ethers.providers.TransactionResponse> {
    const o = overrides ?? {};
    o.maxPriorityFeePerGas = 0;
    o.from = await sender.getAddress();
    const tx = await this.prepSend(o, signWith);
    return sender.sendTransaction(tx);
  }

  async signer(): Promise<string | undefined> {
    if (!this._signed) return;
    if (!this._sig) return;
    const domain = domainFor(
      await (
        await this.provider.getNetwork()
      ).chainId,
      this.wallet,
    );
    return ethers.utils.verifyTypedData(
      domain,
      MEV_TX_TYPES,
      this._tx,
      this._sig,
    );
  }
}
