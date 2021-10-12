import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedPostDto } from './create-feed-post.dto';

export class UpdateFeedPostDto extends PartialType(CreateFeedPostDto) {}
