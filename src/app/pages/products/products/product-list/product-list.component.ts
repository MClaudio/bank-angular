import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';
import { ProductService } from '../../../../services/product.service';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../../../services/notification.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  private _products: Product[] = [];
  public loader: boolean = false;

  public search: string = '';
  public size: number = 5;

  constructor(private _productService: ProductService, private _notificationService: NotificationService) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  private async loadProducts() {
    try {
      this.loader = true;
      let resp: Product[] = await firstValueFrom(
        this._productService.getProducts()
      );
      console.log(this.products);
      this._products = resp;
      this.products = this._products.slice(0, this.size);
      this.loader = false;
    } catch (error) {
      this.loader = false;
      console.log(error);
    }
  }

  public async deleteProduct(id: string | undefined) {
    try {
      let resp = await firstValueFrom(
        this._productService.deleteProduct(id as string)
      );
      console.log('deleteProduct', resp);
      this._notificationService.showSuccess('Product deleted');
      this.products = this.products.filter(
        (product: Product) => product.id !== id
      );
    } catch (error) {
      console.log(error);
    }
  }

  public get length() {
    return this.products.length;
  }

  public onChangeSize() {
    this.products = this._products.slice(0, this.size);
  }

  public onSearch() {
    if (!this.search || this.search === '') {
      this.products = this._products;
      return;
    }
    this.products = this._products.filter(
      (product: Product) =>
        product?.id?.toLowerCase().includes(this.search.toLowerCase()) ||
        product?.name?.toLowerCase().includes(this.search.toLowerCase()) ||
        product?.description?.toLowerCase().includes(this.search.toLowerCase())
    );
  }

}
