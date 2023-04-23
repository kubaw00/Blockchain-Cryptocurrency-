const bodyParser = require('body-parser');
const express = require('express');

const Blockchain = require('./blockchain/index');
const PubSub = require('./app/pubsub');
const app = express();

const blockchain = new Blockchain();
const PORT = 5000;

const pubsub = new PubSub({ blockchain });
setTimeout(() => {
  pubsub.broadcastChain();
}, 1000);

app.get('/api/blocks', (req, res) => {
  res.send(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
  const { data } = req.body;
  blockchain.addBlock({ data });
  pubsub.broadcastChain();
  res.redirect('/api/blocks');
});

app.listen(PORT, () => console.log(`Listen on post ${PORT}`));
