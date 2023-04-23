const Blockchain = require('./index');
const Block = require('./block');
const cryptoHash = require('../util/crypto-hash');

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
      describe('and the chain contains the block with jumped difficulty', () => {
        test('it returns false', () => {
          const lastBlock = blockchain.chain[blockchain.chain.length - 1];
          const lastHash = lastBlock.hash;
          const nonce = 0;
          const timestamp = Date.now();
          const data = [];
          const difficulty = lastBlock.difficulty - 3;
          const hash = cryptoHash(timestamp, data, nonce, difficulty, lastHash);

          const badBlock = new Block({
            nonce,
            timestamp,
            hash,
            lastHash,
            difficulty,
            data,
          });

          blockchain.chain.push(badBlock);

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
    let errorMock, logMock;

    beforeEach(() => {
      errorMock = jest.fn();
      logMock = jest.fn();

      global.console.error = errorMock;
      global.console.log = logMock;
    });

    describe('when the new chain is not longer', () => {
      beforeEach(() => {
        newChain.chain[0] = { new: 'chain' };
        blockchain.replaceChain(newChain.chain);
      });
      test('does not replace the chain', () => {
        expect(blockchain.chain).toEqual(originalChain);
      });

      test('logs an error', () => {
        expect(errorMock).toHaveBeenCalled();
      });
    });

    describe('when the new chain is longer', () => {
      beforeEach(() => {
        newChain.addBlock({ data: 'Dog' });
        newChain.addBlock({ data: 'Cat' });
        newChain.addBlock({ data: 'Cow' });
      });
      describe('chain is invalid', () => {
        beforeEach(() => {
          newChain.chain[2].hash = 'some-fake-hash';
          blockchain.replaceChain(newChain.chain);
        });
        test('does not replace the chain', () => {
          expect(blockchain.chain).toEqual(originalChain);
        });

        test('logs an error', () => {
          expect(errorMock).toHaveBeenCalled();
        });
      });

      describe('chain is valid', () => {
        beforeEach(() => {
          blockchain.replaceChain(newChain.chain);
        });
        test('replaces the chain', () => {
          expect(blockchain.chain).toEqual(newChain.chain);
        });
        test('logs about chain replacement', () => {
          expect(logMock).toHaveBeenCalled();
        });
      });
    });
  });
});
