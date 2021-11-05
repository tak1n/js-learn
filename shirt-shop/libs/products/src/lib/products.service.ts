import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';

// Should be an own PrismaService which is instantiated once
const prisma = new PrismaClient();

@Injectable()
export class ProductsService {
  getProducts(): Promise<Product[]> {
    return prisma.product.findMany();
  }
}
