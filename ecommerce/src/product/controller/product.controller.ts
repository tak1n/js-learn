import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Request,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { ProductService } from '../service/product.service';
import { ProductEntity } from '../product.entity';
import { JwtAuthGuard } from '../../auth/auth.guard';

@Controller('api/v1/products')
export class ProductController {
  constructor(private productsService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<ProductEntity[]> {
    return await this.productsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() product: ProductEntity,
  ): Promise<ProductEntity> {
    return await this.productsService.create(product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param() id: number): Promise<ProductEntity> {
    return await this.productsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param() id: number,
    @Body() product: ProductEntity,
    @Request() req,
  ): Promise<UpdateResult> {
    return await this.productsService.update(id, product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param() id: number, @Request() req): Promise<DeleteResult> {
    return await this.productsService.delete(id, req.user);
  }
}
