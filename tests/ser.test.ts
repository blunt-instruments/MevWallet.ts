import { describe, expect, it } from '@jest/globals';

import * as ethers from 'ethers';
import { MevTxBuilder } from '../src';

const SERIALIZED =
  '{"chainId":31337,"wallet":"0x0000000000300000000000000000000000000000","to":"0x0000000000000050000000000000000000000000","data":"0x1234abcd","value":"0x1f4","delegate":true,"tip":"-0x2328","maxBaseFee":"0x53","timing":"0x1e3c5","nonce":"0x10","r":"0x32c76b09","s":"0x136f75","v":18}';

// describe('toJson', () => {});

describe('fromJson', () => {
  it('decodes the rust lib JSON', () => {
    const b = new MevTxBuilder(
      ethers.constants.AddressZero,
      ethers.providers.getDefaultProvider(),
      SERIALIZED,
    );
    expect(b).toBeDefined();
    expect(b.nonce?.eq(16)).toBe(true);
  });
});
