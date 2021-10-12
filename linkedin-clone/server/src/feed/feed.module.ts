import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { APP_FILTER } from '@nestjs/core';

@Module({
  controllers: [FeedController],
  providers: [
    FeedService,
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class FeedModule {}
