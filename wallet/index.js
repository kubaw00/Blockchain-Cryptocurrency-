const { INITIAL_BALLANCE } = require('../genesis');
const { ec } = require('../util');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALLANCE;

    const keyPair = ec.genKeyPair();
    this.publicKey = keyPair.getPublic().encode('hex');
  }
}

module.exports = Wallet;
