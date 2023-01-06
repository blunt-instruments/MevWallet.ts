import { ethers } from 'ethers';
import { MevWalletFactoryV0, MEV_WALLET_FACTORY_ADDRESS } from '.';
import { MevWalletFactoryV0Abi__factory } from './bindings';

export function getFactory(
  providerOrSigner: ethers.providers.Provider,
): MevWalletFactoryV0 {
  return MevWalletFactoryV0Abi__factory.connect(
    MEV_WALLET_FACTORY_ADDRESS,
    providerOrSigner,
  );
}
