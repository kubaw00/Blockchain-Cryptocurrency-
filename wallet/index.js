const { INITIAL_BALLANCE } = require('../genesis');
const { ec } = require('../util');
const crytpoHash = require('../util/crypto-hash');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALLANCE;

    this.keyPair = ec.genKeyPair();
    this.publicKey = keyPair.getPublic().encode('hex');
  }
  sign(data) {
    return this.keyPair.sign(crytpoHash(data));
  }
}

module.exports = Wallet;
