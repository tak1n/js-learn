import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RolesGuard } from './roles.guard';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
