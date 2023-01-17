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
  '0x0000000000C20afD028A00FBb94e0ee1fE7E56D8';
export const MEV_WALLET_FACTORY_ADDRESS =
  '0x2871F529F2caF44f32E582e8e0a46701E4aD2868';

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
