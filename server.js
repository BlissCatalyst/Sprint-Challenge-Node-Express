const express = require('express');
const helmet = require('helmet');

const endpoints = require('./endpoints.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/endpoints', endpoints);

module.exports = server;