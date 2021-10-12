import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateFeedPostDto } from './dto/create-feed-post.dto';
import { FeedPostDto } from './dto/feed-post.dto';
import { UpdateFeedPostDto } from './dto/update-feed-post.dto';

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  createPost(createFeedPostDto: CreateFeedPostDto): Promise<FeedPostDto> {
    return this.prisma.feedPost.create({ data: createFeedPostDto });
  }

  findAllPosts(): Promise<FeedPostDto[]> {
    return this.prisma.feedPost.findMany();
  }

  async findOnePost(id: string): Promise<FeedPostDto> {
    const feedPost = await this.prisma.feedPost.findUnique({ where: { id } });
    if (!feedPost) {
      throw new NotFoundException('FeedPost not found.');
    }
    return feedPost;
  }

  updatePost(
    id: string,
    updateFeedPostDto: UpdateFeedPostDto,
  ): Promise<FeedPostDto> {
    return this.prisma.feedPost.update({
      where: { id },
      data: updateFeedPostDto,
    });
  }

  removePost(id: string) {
    return this.prisma.feedPost.delete({ where: { id } });
  }
}
