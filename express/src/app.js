'use strict'

// ESM
import express from 'express';

// CJS
// const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!!!' });
});

app.get('/ping', (req, res) => {
  res.json('pong');
});

// ESM
export default app;

// CJS
// module.exports = app