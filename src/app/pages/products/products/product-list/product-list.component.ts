import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';
import { ProductService } from '../../../../services/product.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  public loader: boolean = false;

  constructor(private _productService: ProductService) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  private async loadProducts() {
    try {
      this.products = await firstValueFrom(this._productService.getProducts());
      console.log(this.products);
    } catch (error) {
      console.log(error);
    }
  }

  public async deleteProduct(id: string | undefined) {
    try {
      let resp = await firstValueFrom(
        this._productService.deleteProduct(id as string)
      );
      console.log('deleteProduct', resp);
      this.products = this.products.filter(
        (product: Product) => product.id !== id
      );
    } catch (error) {
      console.log(error);
    }
  }
}
