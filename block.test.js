const Block = require('./block');
const { GENESIS_DATA } = require('./genesis');

describe('block', () => {
  const data = ['data'];
  const hash = 'hash';
  const lastHash = 'lastHash';
  const timestamp = '02/02/03';
  const block = new Block({ data, hash, lastHash, timestamp });

  test('has a stamp, data, hash and last hash propery', () => {
    expect(block.data).toBe(data);
    expect(block.hash).toEqual(hash);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.timestamp).toEqual(timestamp);
  });

  describe('genesis()', () => {
    const genesisBlock = Block.genesis();

    test('check if genesisBlock is instance of Block', () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });
    test('check if genesis block equal genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });
});
