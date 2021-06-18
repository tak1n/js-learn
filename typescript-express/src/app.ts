import express from 'express'
import { Express } from 'express'

export function createApp(): Express {
  const server = express();

  server.get('/', (req, res) => {
    res.json({ message: 'Hello World!!!' });
  });

  server.get('/ping', (req, res) => {
    res.json('pong');
  });

  return server;
}