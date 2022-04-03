import { OrderEntity } from '../order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from '../../cart/service/cart.service';
import { Users } from '../../auth/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private cartService: CartService,
  ) {}

  async getOrders(user: string): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({ relations: ['user'] });
    return orders.filter((order) => order.user?.username === user);
  }

  async order(user: string): Promise<any> {
    const usersOrder = await this.orderRepository.find({ relations: ['user'] });
    const userOrder = usersOrder.filter(
      (order) => order.user?.username === user && order.pending === false,
    );

    const cartItems = await this.cartService.getItemsInCard(user);
    const subTotal = cartItems
      .map((item) => item.total)
      .reduce((acc, next) => acc + next);

    const authUser = await this.userRepository.findOne({ username: user });
    const cart = cartItems.map((item) => item.item);

    if (userOrder.length === 0) {
      const newOrder = this.orderRepository.create({ subTotal });
      newOrder.items = cart;
      newOrder.user = authUser;
      return await this.orderRepository.save(newOrder);
    } else {
      const existingOrder = userOrder.map((item) => item);
      await this.orderRepository.update(existingOrder[0].id, {
        subTotal: existingOrder[0].subTotal + cart[0].price,
      });
      return { message: 'order modified' };
    }
  }
}
