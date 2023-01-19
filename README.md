# MevWallet TS

A Typescript Library for interacting with
[MevWallets](https://github.com/blunt-instruments/MevWallet)

Please see the MevWallet repo for an explanation of what a `MevWallet` is, and
why you'd want to use one

### How do I use this repo?

This repo has a TS library for working with MevTxns, based on `ethers.js`.

Use `MevTxBuilder` to build a txn:

```typescript
import { MevTxBuilder } from 'mev-tx-ts';
const builder = new MevTxBuilder(walletAddress, provider);
builder.to = wethAddress;
// this is the easiest way to do calls to other contracts :)
builder.data = weth
  .getInterface()
  .encodeFunctionData('transfer', recipient, amount);
builder.tip = ethers.utils.parseUnits('1', 'gwei');
await builder.complete();

let signed = await builder.sign(wallet);
```

Send the `MevTx` from some account:

```typescript
builder.send(fromSigner, overrides);
```

You can also use this lib to deploy a new proxy contract:

```typescript
import { getFactory } from 'mev-tx-ts';
const factory = getFactory(provider);
const wallet = factory.createWallet();
```

### Addresses

- MevWeth: `0x00000000008C43efC014746c230049e330039Cb3`
- MevWalletV1 Implementation: ``
- MevWalletV1 ProxyFactory: ``

Didn't bother to grind an address for the proxy factory :)

### Running Tests

Use `devenv.sh` from
[MevWallet](https://github.com/blunt-instruments/MevWallet) and then run
`yarn test`
