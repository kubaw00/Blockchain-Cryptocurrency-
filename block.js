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
}

module.exports = Block;
