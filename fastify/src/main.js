'use strict';

const server = require('./app')({
  logger: {
    level: 'info',
    prettyPrint: false,
  },
});

server.listen(3000, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
