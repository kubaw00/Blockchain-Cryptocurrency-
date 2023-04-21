const Block = require('./block');
const Blockchain = require('./blockchain');

const blockchain = new Blockchain();

blockchain.addBlock({ data: 'initial' });

let nextBlock, prevTimestamp, nextTimestamp, timeDiff, average;

const times = [];
for (let i = 0; i < 1000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

  blockchain.addBlock({ data: `block${i}` });

  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;

  timeDiff = nextTimestamp - prevTimestamp;
  times.push(timeDiff);

  average = times.reduce((acc, curr) => acc + curr, 0) / times.length;

  console.log(
    `Time to mine block:  ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${average} `
  );
}
