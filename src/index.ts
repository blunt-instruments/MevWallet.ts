import * as ethers from 'ethers';

export { MevTxBuilder } from './builder';
export type {
  MevWalletV1Abi as MevWalletV1,
  MevWethAbi as MevWeth,
  MevWalletFactoryV1Abi as MevWalletFactoryV1,
} from './bindings';
export {
  MevWalletV1Abi__factory as MevWalletV1__factory,
  MevWethAbi__factory as MevWeth__factory,
  MevWalletFactoryV1Abi__factory as MevWalletFactory__factory,
} from './bindings';

export { getFactory } from './deploy';

export * as utils from './utils';

export const MEV_WETH_ADDRESS = '0x00000000008C43efC014746c230049e330039Cb3';
export const MEV_WALLET_IMPL_ADDRESS =
  '0x0000000000c08718718B974D644B098C19bd0064';
export const MEV_WALLET_FACTORY_ADDRESS =
  '0x9248B5e672e1880af34068C0FaE18D30c26D05Fb';

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
