const express = require('express');
const Blockchain = require('./blockchain');

const app = express();

const blockchain = new Blockchain();
const PORT = 5000;

app.get('/api/blocks', (req, res) => {
  res.send(blockchain.chain);
});

app.listen(PORT, () => console.log(`Listen on post ${PORT}`));
