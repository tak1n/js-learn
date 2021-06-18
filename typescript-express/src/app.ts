import express from 'express'
import { Express } from 'express'

export function createApp(): Express {
  const server = express()
  server.get('/', (req, res) => {
    res.send('Hello World!!!')
  })
  return server
}