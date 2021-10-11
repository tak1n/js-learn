import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcrypt from 'bcrypt';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  async findUser(id: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.findUser(id);
    return UserDto.toDTO(user);
  }

  async create(userCreateDto: UserCreateDto): Promise<UserDto> {
    const user = new UserEntity();

    user.email = userCreateDto.email;
    user.name = userCreateDto.name;
    user.username = userCreateDto.username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.authService.hashPassword(
      userCreateDto.password,
      user.salt,
    );

    user.save();

    return UserDto.toDTO(user);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepo.find();

    return users.map((user) => UserDto.toDTO(user));
  }

  deleteOne(id: string): Promise<any> {
    return this.userRepo.delete(id);
  }

  async update(id: string, userUpdateDto: UserUpdateDto): Promise<UserDto> {
    const user = await this.findUser(id);

    if (userUpdateDto.name) {
      user.name = userUpdateDto.name;
    }
    if (userUpdateDto.username) {
      user.username = userUpdateDto.username;
    }
    if (userUpdateDto.email) {
      user.email = userUpdateDto.email;
    }

    user.save();

    return UserDto.toDTO(user);
  }
}
