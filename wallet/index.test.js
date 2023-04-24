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
});
