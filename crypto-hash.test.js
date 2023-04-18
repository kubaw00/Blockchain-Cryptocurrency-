const { cryptoHash } = require('.crypto-hash');

describe('cryptoHash()', () => {
  const hash = cryptoHash('foo');

  test('check if function hash string with SHA-256 algoritm', () => {
    expect(hash).toEqual(
      '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae'
    );
  });

  test('check if order of inputs change hash', () => {
    expect(cryptoHash('foo', 'boo', 'faa')).toEqual('faa', 'foo', 'boo');
  });
});
