import { TypedDataDomain } from '@ethersproject/abstract-signer';
import { MevTx, SerializedMevTx } from './index';

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

export function serializeMevTx(tx: MevTx): SerializedMevTx {
  return {
    to: tx.to,
    data: tx.data,
    value: tx.value.toHexString(),
    delegate: tx.delegate,
    tip: tx.tip.toHexString(),
    maxBaseFee: tx.maxBaseFee.toHexString(),
    timing: tx.timing.toHexString(),
    nonce: tx.nonce.toHexString(),
  };
}
