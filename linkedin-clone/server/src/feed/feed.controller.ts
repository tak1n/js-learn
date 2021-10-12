import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { CreateFeedPostDto } from './dto/create-feed-post.dto';
import { UpdateFeedPostDto } from './dto/update-feed-post.dto';
import { FeedPostDto } from './dto/feed-post.dto';

@Controller('feeds')
@UsePipes(ValidationPipe)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  create(@Body() createFeedPostDto: CreateFeedPostDto): Promise<FeedPostDto> {
    return this.feedService.createPost(createFeedPostDto);
  }

  @Get()
  findAll(): Promise<FeedPostDto[]> {
    return this.feedService.findAllPosts();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<FeedPostDto> {
    return this.feedService.findOnePost(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFeedPostDto: UpdateFeedPostDto,
  ): Promise<FeedPostDto> {
    return this.feedService.updatePost(id, updateFeedPostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.feedService.removePost(id);
  }
}
