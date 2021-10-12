import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'nestjs-prisma';
import { truncateDB } from './helper';

describe('Feed API', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get(PrismaService);
    await app.init();
  });

  afterEach(async () => {
    await truncateDB(prisma);
  });

  describe('GET /feeds', () => {
    it('returns a list of FeedPosts', async () => {
      await prisma.feedPost.createMany({
        data: [{ body: 'Test1' }, { body: 'Test2' }, { body: 'Test3' }],
      });

      const { status, body } = await request(app.getHttpServer()).get('/feeds');

      expect(status).toBe(200);
      expect(body.length).toBe(3);
      expect(body).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            body: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('GET /api/feeds/:id', () => {
    it.todo('returns a single FeedPost');
  });

  describe('POST /api/feeds', () => {
    it.todo('creates a FeedPost');
  });

  describe('PATCH /api/feeds/:id', () => {
    it.todo('updates a FeedPost');
  });

  describe('DELETE /api/feeds/:id', () => {
    it.todo('deletes a FeedPost');
  });
});
