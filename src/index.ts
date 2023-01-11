import * as ethers from 'ethers';

export { MevTxBuilder } from './builder';
export type {
  MevWalletV0Abi as MevWalletV0,
  MevWethAbi as MevWeth,
  MevWalletFactoryV0Abi as MevWalletFactoryV0,
} from './bindings';
export {
  MevWalletV0Abi__factory as MevWalletV0__factory,
  MevWethAbi__factory as MevWeth__factory,
  MevWalletFactoryV0Abi__factory as MevWalletFactory__factory,
} from './bindings';

export { getFactory } from './deploy';

export * as utils from './utils';

export const MEV_WETH_ADDRESS = '0x00000000008C43efC014746c230049e330039Cb3';
export const MEV_WALLET_IMPL_ADDRESS =
  '0x00000000008EaBBE9A46Fa87F0d1e41e62A96d50';
export const MEV_WALLET_FACTORY_ADDRESS =
  '0x444544a54b5193Ba6D1A3Cf9c83Ee12422b6A824';

export const MEV_TX_TYPES: Record<string, Array<ethers.TypedDataField>> = {
  MevTx: [
    { name: 'to', type: 'address' },
    { name: 'data', type: 'bytes' },
    { name: 'value', type: 'int256' },
    { name: 'delegate', type: 'bool' },
    { name: 'tip', type: 'int256' },
    { name: 'maxBaseFee', type: 'uint256' },
    { name: 'timing', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
  ],
};

export type MevTx = {
  to: string;
  data: string;
  value: ethers.BigNumber;
  delegate: boolean;
  tip: ethers.BigNumber;
  maxBaseFee: ethers.BigNumber;
  timing: ethers.BigNumber;
  nonce: ethers.BigNumber;
};

export type SerializedMevTx = {
  to: string;
  data: string;
  value: string;
  delegate: boolean;
  tip: string;
  maxBaseFee: string;
  timing: string;
  nonce: string;
};

export type SignedMevTx = SerializedMevTx & { v: number; r: string; s: string };
