const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  test('has an chain property as array instance', () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  test('starts with genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  test('adds a new block to the chain', () => {
    const newData = 'newData';
    blockchain.addBlock({ data: newData });
    console.log(blockchain.chain);
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe('isValidChain()', () => {
    describe('when the chain does not start with the genesis block', () => {
      test('returns false', () => {
        blockchain.chain[0] = { data: 'fake-genesis' };

        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });
    describe('when the chain starts with genesis block and has multiple blocks', () => {
      beforeEach(() => {
        blockchain.addBlock({ data: 'Dog' });
        blockchain.addBlock({ data: 'Cat' });
        blockchain.addBlock({ data: 'Cow' });
      });
      describe('and a lastHash reference has changed', () => {
        test('returns false', () => {
          blockchain.chain[2].lastHash = 'broken-lastHash';
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe('and the chain contains a block with invalid field', () => {
        test('returns false', () => {
          blockchain.chain[2].data = 'invalid-field';
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe('and the chain does not contain any invalid fields', () => {
        test('returns true', () => {
          blockchain.chain[2].data = 'invalid-field';
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });
});
