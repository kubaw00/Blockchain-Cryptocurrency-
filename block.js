const { GENESIS_DATA } = require('./genesis');
const cryptoHash = require('./crypto-hash');

class Block {
  constructor({ timestamp, hash, lastHash, data }) {
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
    this.timestamp = timestamp;
  }

  static genesis() {
    return new Block(GENESIS_DATA);
  }
  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = cryptoHash(data, lastHash, timestamp);

    return new this({
      timestamp,
      data,
      lastHash,
      hash,
    });
  }
}

module.exports = Block;
