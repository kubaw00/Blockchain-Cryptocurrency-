const Block = require('./block');
const cryptoHash = require('../util/crypto-hash');
const { GENESIS_DATA } = require('../genesis');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { hash, lastHash, timestamp, data, difficulty, nonce } = chain[i];
      const actualHash = chain[i - 1].hash;
      if (actualHash !== lastHash) {
        return false;
      }
      const lastDifficulty = chain[i - 1].difficulty;
      if (Math.abs(lastDifficulty - difficulty > 1)) {
        return false;
      }

      if (hash !== cryptoHash(timestamp, lastHash, data, difficulty, nonce)) {
        return false;
      }
    }
    return true;
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.error('The incoming chain must be longer');
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error('The incoming chain must be valid');
      return;
    }
    console.log('raplacing chain with', chain);
    this.chain = chain;
  }
}

module.exports = Blockchain;
