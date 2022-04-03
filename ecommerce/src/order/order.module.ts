import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/auth/user.entity';
import { CartEntity } from 'src/cart/cart.entity';
import { CartService } from 'src/cart/service/cart.service';
import { ProductEntity } from 'src/product/product.entity';
import { ProductService } from 'src/product/service/product.service';
import { OrderEntity } from './order.entity';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, ProductEntity, CartEntity, Users]),
  ],
  // controllers: [OrderController],
  providers: [OrderService, CartService, ProductService],
  controllers: [OrderController],
})
export class OrderModule {}
