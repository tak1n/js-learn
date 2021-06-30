'use strict';

const build = require('../src/app.js');
const request = require('supertest');

const app = build();

describe('App', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(() => {
    app.close();
  });

  describe('GET / without supertest', () => {
    it("should respond with a 200 response and a 'Hello World' body", async () => {
      const { statusCode, body } = await app.inject({
        method: 'GET',
        url: '/',
      });

      expect(statusCode).toBe(200);
      expect(JSON.parse(body)).toStrictEqual({ message: 'Hello World!!' });
    });
  });

  describe('GET /', () => {
    it("should respond with a 200 response and a 'Hello World' body", async () => {
      const { status, body } = await request(app.server).get('/');

      expect(status).toBe(200);
      expect(body).toStrictEqual({ message: 'Hello World!!' });
    });
  });
});
