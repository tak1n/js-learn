'use strict';

const fastify = require('fastify');
const PORT = process.env.PORT || 3000;

const build = (opts = {}) => {
  const app = fastify(opts);

  app.get('/', async (request, reply) => {
    return { message: 'Hello World!!' };
  });

  return app;
};

module.exports = build;
