const { GENESIS_DATA } = require('./genesis');
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
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    const { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash,
    });
  }
}

module.exports = Block;
