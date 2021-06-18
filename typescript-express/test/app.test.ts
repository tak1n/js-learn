import { createApp } from '../src/app'
import request from 'supertest'

const app = createApp()

describe("Test public routes", () => {
  it("should respond with a 200 response and a 'Hello World' body in / route", async () => {
    await request(app)
      .get("/")
      .expect(200, "Hello World!!!")
  })
})