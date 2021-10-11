import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import * as bcrypt from 'bcrypt';

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

  findOne(id: string): Promise<UserEntity> {
    return this.findUser(id);
  }

  async create(userCreateDto: UserCreateDto): Promise<UserEntity> {
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

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepo.find();

    return users;
  }

  deleteOne(id: string): Promise<any> {
    return this.userRepo.delete(id);
  }

  async update(id: string, userUpdateDto: UserUpdateDto): Promise<UserEntity> {
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

    return user;
  }
}
