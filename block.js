class Block {
  constructor({ timestamp, hash, lastHash, data }) {
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
    this.timestamp = timestamp;
  }
}

module.exports = Block;
