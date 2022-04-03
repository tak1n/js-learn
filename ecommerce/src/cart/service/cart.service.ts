import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from '../cart.entity';
import { ProductService } from '../../product/service/product.service';
import { Users } from '../../auth/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private productService: ProductService,
  ) {}

  async getItemsInCard(user: string): Promise<CartEntity[]> {
    const userCart = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    return userCart.filter((item) => item.user.username === user);
  }

  async addToCart(
    productId: number,
    quantity: number,
    user: string,
  ): Promise<any> {
    const cartItems = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    const product = await this.productService.getOne(productId);
    const authUser = await this.userRepository.findOne({ username: user });

    if (product) {
      const cart = cartItems.filter(
        (item) => item.item.id === productId && item.user.username === user,
      );
      if (cart.length < 1) {
        const newItem = this.cartRepository.create({
          total: product.price * quantity,
          quantity,
        });
        newItem.user = authUser;
        newItem.item = product;
        this.cartRepository.save(newItem);

        return await this.cartRepository.save(newItem);
      } else {
        const quantity = (cart[0].quantity += 1);
        const total = cart[0].total * quantity;

        return await this.cartRepository.update(cart[0].id, {
          quantity,
          total,
        });
      }
    }
    return null;
  }
}
