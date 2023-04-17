const Block = require('./block');

describe('block', () => {
  const data = ['data'];
  const hash = 'hash';
  const lastHash = 'lastHash';
  const timestamp = '02/02/03';
  const block = new Block({ data, hash, lastHash, timestamp });

  test('has a stamp, data, hash and last hash propery', () => {
    expect(block.data).toEqual(data);
    expect(block.hash).toEqual(hash);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.timestamp).toEqual(timestamp);
  });
});
