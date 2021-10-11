import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() userCreateDto: UserCreateDto): Promise<UserDto> {
    return this.userService.create(userCreateDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserDto> {
    return this.userService.update(id, userUpdateDto);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteOne(id);
  }
}
