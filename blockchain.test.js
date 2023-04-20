const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  let blockchain, newChain, originalChain;

  beforeEach(() => {
    blockchain = new Blockchain();
    newChain = new Blockchain();
    originalChain = [...blockchain.chain];
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
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });

  describe('replaceChain()', () => {
    describe('when the new chain is not longer', () => {
      test('does not replace the chain', () => {
        newChain.chain[0] = { new: 'chain' };
        blockchain.replaceChain(newChain.chain);
        expect(blockchain.chain).toEqual(originalChain);
      });
    });
    describe('when the new chain is longer', () => {
      beforeEach(() => {
        newChain.addBlock({ data: 'Dog' });
        newChain.addBlock({ data: 'Cat' });
        newChain.addBlock({ data: 'Cow' });
      });
      describe('chain is invalid', () => {
        test('does not replace the chain', () => {
          newChain.chain[2].hash = 'some-fake-hash';
          blockchain.replaceChain(newChain.chain);
          expect(blockchain.chain).toEqual(originalChain);
        });
      });

      describe('chain is valid', () => {
        test('replaces the chain', () => {
          blockchain.replaceChain(newChain.chain);
          expect(blockchain.chain).toEqual(newChain.chain);
        });
      });
    });
  });
});
