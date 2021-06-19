'use strict'

// ESM
import app from './app.js'

// CJS
// const app = require('./app.js')

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.info(`Listening on Port ${port}`);
})