const { GENESIS_DATA } = require('./genesis');

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
    return new this({
      timestamp: Date.now(),
      data,
      lastHash: lastBlock.hash,
    });
  }
}

module.exports = Block;
