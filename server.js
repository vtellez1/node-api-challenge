const express = require('express');

const projectRouter = require('./data/routers/projectRouter');
const actionRouter = require('./data/routers/actionRouter');

const server = express();

server.get('/', (req, res) => {
    res.send(`<h1>First Node sprint...Woooo<h1>`);
});

function logger(req, res, next) {
    console.log(
      `Method:${req.method} URL:${req.url} Time:[${new Date().toISOString()}]`
    );
    next();
  };

  server.use(logger);
  server.use('/api/project', projectRouter);
  server.use('/api/action', actionRouter);

  module.exports = server;