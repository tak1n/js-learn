import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../auth/user.entity';
import { ProductEntity } from '../product/product.entity';
import { ProductService } from '../product/service/product.service';
import { CartEntity } from './cart.entity';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ProductEntity, Users])],
  providers: [CartService, ProductService],
  controllers: [CartController],
})
export class CartModule {}
