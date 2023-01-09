import { TypedDataDomain } from '@ethersproject/abstract-signer';
import { BigNumber } from 'ethers';
import { MevTx, SerializedMevTx } from './index';

export class MissingKeys extends Error {
  constructor(missing: readonly string[], additional?: string) {
    const add = additional ? `Additional Info: ${additional}` : '';
    super(`Missing keys: [${missing.join(', ')}]. ${add}`);
  }
}

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

export function serialize(tx: Partial<MevTx>): Partial<SerializedMevTx> {
  return {
    to: tx.to,
    data: tx.data,
    value: tx.value?.toHexString(),
    delegate: tx.delegate,
    tip: tx.tip?.toHexString(),
    maxBaseFee: tx.maxBaseFee?.toHexString(),
    timing: tx.timing?.toHexString(),
    nonce: tx.nonce?.toHexString(),
  };
}

export function deserializePartial(
  obj: Record<string, unknown>,
): Partial<MevTx> {
  const tx: Partial<MevTx> = {};
  if (typeof obj.to === 'string') tx.to = obj.to;
  if (typeof obj.data === 'string') tx.data = obj.data;
  if (typeof obj.value === 'string') tx.value = BigNumber.from(obj.value);
  if (typeof obj.delegate === 'boolean') tx.delegate = obj.delegate;
  if (typeof obj.tip === 'string') tx.tip = BigNumber.from(obj.tip);
  if (typeof obj.maxBaseFee === 'string')
    tx.maxBaseFee = BigNumber.from(obj.maxBaseFee);
  if (typeof obj.timing === 'string') tx.timing = BigNumber.from(obj.timing);
  if (typeof obj.nonce === 'string') tx.nonce = BigNumber.from(obj.nonce);
  return tx;
}

export function missingKeys(
  obj: Record<string, unknown>,
): ReadonlyArray<keyof MevTx> {
  const keys = [];
  if (!('to' in obj) || obj.to === undefined) keys.push('to');
  if (!('data' in obj) || obj.data === undefined) keys.push('data');
  if (!('value' in obj) || obj.value === undefined) keys.push('value');
  if (!('delegate' in obj) || obj.delegate === undefined) keys.push('delegate');
  if (!('tip' in obj) || obj.tip === undefined) keys.push('tip');
  if (!('maxBaseFee' in obj) || obj.maxBaseFee === undefined)
    keys.push('maxBaseFee');
  if (!('timing' in obj) || obj.timing === undefined) keys.push('timing');
  if (!('nonce' in obj) || obj.nonce === undefined) keys.push('nonce');
  return keys as ReadonlyArray<keyof MevTx>;
}

export function deserialize(obj: Record<string, unknown>): MevTx {
  const preCond = missingKeys(obj);
  if (preCond.length !== 0) {
    throw new MissingKeys(
      preCond,
      'Before deserialization. This indicates that a value was missing.',
    );
  }
  const tx: Partial<MevTx> = {};
  if (typeof obj.to === 'string') tx.to = obj.to;
  if (typeof obj.data === 'string') tx.data = obj.data;
  if (typeof obj.value === 'string') tx.value = BigNumber.from(obj.value);
  if (typeof obj.delegate === 'boolean') tx.delegate = obj.delegate;
  if (typeof obj.tip === 'string') tx.tip = BigNumber.from(obj.tip);
  if (typeof obj.maxBaseFee === 'string')
    tx.maxBaseFee = BigNumber.from(obj.maxBaseFee);
  if (typeof obj.timing === 'string') tx.timing = BigNumber.from(obj.timing);
  if (typeof obj.nonce === 'string') tx.nonce = BigNumber.from(obj.nonce);

  const postCond = missingKeys(obj);
  if (postCond.length !== 0) {
    throw new MissingKeys(
      postCond,
      'After desrerialization. This indicates that a value was an unexpected type.',
    );
  }
  return tx as MevTx;
}

export function hasSig(obj: Record<string, unknown>): boolean {
  if ('r' in obj && typeof obj.r === 'string')
    try {
      BigNumber.from(obj.r);
    } catch {
      return false;
    }
  if ('s' in obj && typeof obj.s === 'string')
    try {
      BigNumber.from(obj.s);
    } catch {
      return false;
    }
  if ('v' in obj && typeof obj.v === 'number') return true;
  return false;
}
