const app = require('../src/app')
const request = require('supertest')

describe('App', () => {
  describe('GET /', () => {
    it('should respond with a 200 response and a \'Hello World\' body', async () => {
      const { status, body } = await request(app)
        .get('/');

      expect(status).toBe(200);
      expect(body).toStrictEqual({ message: 'Hello World!!!' });
    });
  });

  describe("GET /ping", () => {
    it('responds with pong and HTTP status 200', async () => {
      const { status, body } = await request(app)
        .get('/ping');

      expect(status).toBe(200);
      expect(body).toStrictEqual('pong');
    })
  })
})