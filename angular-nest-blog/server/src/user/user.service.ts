import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  create(user: User): Promise<User> {
    return this.userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  deleteOne(id: string): Promise<any> {
    return this.userRepo.delete(id);
  }

  async update(id: string, user: User): Promise<User> {
    const storedUser = await this.findOne(id);

    storedUser.name = user.name;
    storedUser.username = user.username;

    this.userRepo.save(storedUser);

    return storedUser;
  }
}
