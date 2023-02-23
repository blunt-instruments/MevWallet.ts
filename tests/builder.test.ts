import { describe, expect, it } from '@jest/globals';

import * as ethers from 'ethers';

import {
  MevWeth__factory,
  MEV_WETH_ADDRESS,
  MevWeth,
  MevTxBuilder,
} from '../src';

const KEY = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const PROVIDER = new ethers.providers.StaticJsonRpcProvider(
  'http://127.0.0.1:8545',
);

const SIGNER = new ethers.Wallet(KEY, PROVIDER);

const MEV_WALLET_ADDR = '0xf12cf18103fe766f2d1981ea5cf309cc37b04969';
const SIGNER_ADDR = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';

// const WALLET: MevWalletV0 = MevWalletV0__factory.connect(MEV_WALLET_ADDR, SIGNER);
const MEV_WETH: MevWeth = MevWeth__factory.connect(MEV_WETH_ADDRESS, SIGNER);

describe('Wallet Builder', () => {
  it('create MEV transaction', async () => {
    expect(SIGNER.address.toLowerCase()).toMatch(SIGNER_ADDR.toLowerCase());

    const preBalance = await MEV_WETH.balanceOf(MEV_WALLET_ADDR);
    if (preBalance.isZero()) {
      await MEV_WETH.transfer(
        MEV_WALLET_ADDR,
        ethers.constants.WeiPerEther.mul(10),
      );
    }

    const tx = new MevTxBuilder(MEV_WALLET_ADDR, PROVIDER);
    tx.to = MEV_WETH_ADDRESS;
    tx.data = MEV_WETH.interface.encodeFunctionData('transfer', [
      ethers.constants.AddressZero,
      ethers.BigNumber.from(1),
    ]);
    tx.deadline = ethers.constants.Zero;
    tx.notBefore = ethers.constants.Zero;
    tx.tip = ethers.utils.parseUnits('1', 'gwei');
    tx.maxBaseFee = ethers.utils.parseUnits('1230', 'gwei');
    await tx.populateNonce();
    await tx.complete();
    await tx.sign(SIGNER);

    const t = await tx.send(SIGNER);
    const receipt = await t.wait();
    expect(receipt.status).toBe(1);
  });
});
