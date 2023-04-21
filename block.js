const hexToBinary = require('hex-to-binary');

const { GENESIS_DATA, MINE_RATE } = require('./genesis');
const cryptoHash = require('./crypto-hash');

class Block {
  constructor({ timestamp, hash, lastHash, data, nonce, difficulty }) {
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
    this.timestamp = timestamp;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    let { difficulty } = lastBlock;
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: lastBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (
      hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty)
    );

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    if (originalBlock.difficulty < 1) {
      return 1;
    }

    if (timestamp - originalBlock.timestamp > MINE_RATE) {
      return originalBlock.difficulty - 1;
    }

    return originalBlock.difficulty + 1;
  }
}

module.exports = Block;
