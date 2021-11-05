import { Component, OnInit } from '@angular/core';
import { Product } from '@prisma/client';
import { Observable } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'shirt-shop-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  $products!: Observable<Product[]>;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.$products = this.productService.getProducts();
  }
}
