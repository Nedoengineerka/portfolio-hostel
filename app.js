const express = require('express');
const app = express();

const server = require('http');
require('dotenv').config();

app.use(express.json());

const port = process.env.PORT || 3000;
server.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(port);

console.log(`Server running at port ${port}`);