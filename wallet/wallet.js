const { INITIAL_BALLANCE } = require('../genesis');

class Wallet {
  constructor() {
    this.ballance = INITIAL_BALLANCE;
    this.publicKey = null;
  }
}
