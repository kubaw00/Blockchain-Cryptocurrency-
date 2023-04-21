const Block = require('./block');
const { GENESIS_DATA, MINE_RATE } = require('./genesis');
const cryptoHash = require('./crypto-hash');

describe('block', () => {
  const data = ['data'];
  const hash = 'hash';
  const lastHash = 'lastHash';
  const timestamp = 2000;
  const nonce = 1;
  const difficulty = 1;
  const block = new Block({
    data,
    hash,
    lastHash,
    timestamp,
    nonce,
    difficulty,
  });

  test('has a stamp, data, hash and last hash propery', () => {
    expect(block.data).toBe(data);
    expect(block.hash).toEqual(hash);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.timestamp).toEqual(timestamp);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
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

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock({ lastBlock, data });

    test('check if minedBlock is istanceof Block', () => {
      expect(minedBlock instanceof Block).toEqual(true);
    });

    test('check if last hash of minedBlock is hash of Block', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });
    test('sets the data', () => {
      expect(minedBlock.data).toEqual(data);
    });
    test('sets a timestamp', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });
    test('creates a sha-256 `hash` based on the proper inputs', () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(
          minedBlock.timestamp,
          minedBlock.nonce,
          minedBlock.difficulty,
          lastBlock.hash,
          data
        )
      );
    });
    test('sets a `hash` that matches difficulty criteria', () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual(
        '0'.repeat(minedBlock.difficulty)
      );
    });
  });

  describe('adjustDiffuculty()', () => {
    test('raises diffuculty for the quickly mined block', () => {
      expect(
        Block.adjustDifficulty({
          originalBlock: block,
          timestamp: block.timestamp + MINE_RATE - 100,
        })
      ).toEqual(block.difficulty + 1);
    });
    test('lowers diffuculty for the quickly mined block', () => {
      expect(
        Block.adjustDifficulty({
          originalBlock: block,
          timestamp: block.timestamp + MINE_RATE + 100,
        })
      ).toEqual(block.difficulty - 1);
    });
  });
});
