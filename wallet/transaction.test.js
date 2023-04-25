const Wallet = require('./index');
const Transaciton = require('./transaction');

describe('Transaction', () => {
  let transaction, senderWallet, recipient, amount;

  beforeEach(() => {
    senderWallet = new Wallet();
    amount = 50;
    recipient = 'recipient-public-key';
    transaction = new Transaction({ senderWallet, amount, recipient });
  });

  test('has an id', () => {
    expect(transaction).toHaveProperty('id');
  });

  describe('outputMap', () => {
    test('has an outputMap', () => {
      expect(transaction).toHaveProperty('outputMap');
    });

    test('outputs the amount to the client', () => {
      expect(transaction.outputMap[recipient]).toEqual(amount);
    });

    test('outputs the remaining balance to the senderWallet', () => {
      expect(transaction.outputMap[senderWallet.publicKey]).toEqual(
        senderWallet.balance - amount
      );
    });
  });
});
