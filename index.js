const bodyParser = require('body-parser');
const express = require('express');

const Blockchain = require('./blockchain');
const app = express();

const blockchain = new Blockchain();
const PORT = 5000;

app.get('/api/blocks', (req, res) => {
  res.send(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
  const { data } = req.body;
  blockchain.addBlock({ data });
  res.redirect('/api/blocks');
});

app.listen(PORT, () => console.log(`Listen on post ${PORT}`));
