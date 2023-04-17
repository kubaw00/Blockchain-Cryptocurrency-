class Block {
  constructor({ timestamp, hash, lastHash, data }) {
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
    this.timestamp = timestamp;
  }
}

const block = new Block({
  timestamp: '03/03/03',
  data: 'data',
  hash: 'hash',
  lastHash: 'lastHash',
});

console.log(block);
