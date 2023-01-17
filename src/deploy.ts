import { ethers } from 'ethers';
import { MevWalletFactoryV1, MEV_WALLET_FACTORY_ADDRESS } from '.';
import { MevWalletFactoryV1Abi__factory } from './bindings';

export function getFactory(
  providerOrSigner: ethers.providers.Provider,
): MevWalletFactoryV1 {
  return MevWalletFactoryV1Abi__factory.connect(
    MEV_WALLET_FACTORY_ADDRESS,
    providerOrSigner,
  );
}
