const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
  const blockchain = new Blockchain();
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
});
