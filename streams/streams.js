/** 
 * Different type of streams:
 * - Readable Stream (process.stdin, fs.createReadStream, http IncomingMessage) - Buffers are used to store data which could not yet consumed if the application is slower than the OS read
 * - Writable Stream (process.stdout, process.stderr, fs.createWriteStream) - Buffers are used temporarly storing data which could not yet written by the application if the destination is too slow
 * - Duplex Stream (net.Socket) - uses Buffers on read and write side
 * - Transform Stream (Cipher, PassThrough [no transformation]) - Read Buffer is connected to Write Buffer while applying some transformation in between
 * 
 * Piping:
 * - Connecting streams together is called piping, eg copying from one file to another is done through piping
 * 
 * Backpressure:
 * - Buffers are limited to the available Memory on a system.
 * - In order to not overflow Buffers (available memory) and prevent data loss streams can indicate a threshold to indicate pausing data flow.
 * - https://nodejs.org/api/stream.html#stream_buffering
 */

// Example 1 ReadStream
const { createReadStream, ReadStream } = require('fs')

var readStream = createReadStream('./original.txt');

readStream.on('data', chunk => {
  console.log('---------------------------------');
  console.log(chunk);
  console.log('---------------------------------');
});

readStream.on('open', () => {
  console.log('Stream opened...');
});

readStream.on('end', () => {
  console.log('Stream Closed...');
});

// Example 2 Piping
const fs = require('fs')

const original = fs.createReadStream('./original.txt')
const copy1 = fs.createWriteStream('./copy1.txt')
const copy2 = fs.createWriteStream('./copy2.txt')

original.pipe(copy1)
original.pipe(copy2)
