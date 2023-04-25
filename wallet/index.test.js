const { verifySignature } = require('../util');
const Wallet = require('./index');

describe('wallet', () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  test('to have publicKey', () => {
    expect(wallet).toHaveProperty('publicKey');
  });

  test('to have balance', () => {
    expect(wallet).toHaveProperty('balance');
  });

  describe('signing data', () => {
    const data = 'foobar';

    test('verifies signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: wallet.sign(data),
        })
      ).toBe(true);
    });

    test('not verify invalid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: new Wallet().sign(data),
        })
      ).toBe(false);
    });
  });
});
