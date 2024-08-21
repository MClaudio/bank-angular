import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';
import { ProductService } from '../../../../services/product.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { NotificationService } from '../../../../services/notification.service';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  private _products: Product[] = [];
  public loader: boolean = false;
  private _subscription?: Subscription;
  public search: string = '';
  public size: number = 5;

  /**
   * @description
   * Constructor
   *
   * @param {ProductService} _productService - ProductService
   * @param {NotificationService} _notificationService - NotificationService
   * @param {ModalService} _modalService - ModalService
   */
  constructor(
    private _productService: ProductService,
    private _notificationService: NotificationService,
    private _modalService: ModalService
  ) {}

  /**
   * @description
   * Component init function.
   *
   * @returns
   */
  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * @description
   * Component destroy function.
   *
   * @returns
   */
  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }

  /**
   * @description
   * Loads the products from the API.
   *
   * @returns
   */
  private async loadProducts() {
    try {
      this.loader = true;
      let resp: Product[] = await firstValueFrom(
        this._productService.getProducts()
      );
      this._products = resp;
      this.products = this._products.slice(0, this.size);
      this.loader = false;
    } catch (error: any) {
      this.loader = false;
      console.log(error);
      this._modalService.openModal(
        'error',
        'Error',
        error?.error?.message || error?.message || JSON.parse(error)
      );
    }
  }

  /**
   * @description
   * Deletes a product from the API.
   *
   * @param {Product} product - Product
   * @returns
   */
  public async deleteProduct(product: Product) {
    try {
      this._modalService.openModal(
        'error',
        'Delete product ' + product.name,
        'Are you sure you want to delete this product?',
        true
      );

      this._subscription = this._modalService.eventOnOk.subscribe(
        async (isOk: boolean) => {
          if (isOk) {
            let resp = await firstValueFrom(
              this._productService.deleteProduct(product.id as string)
            );
            this._notificationService.showSuccess('Product deleted');
            this.products = this.products.filter(
              (item: Product) => item.id !== product.id
            );
          }
        }
      );
    } catch (error: any) {
      console.log(error);
      this._modalService.openModal(
        'error',
        'Error',
        error?.error?.message || error?.message || JSON.parse(error)
      );
    }
  }

  /**
   * @description
   * Get length of products.
   *
   * @returns
   */
  public get length() {
    return this.products.length;
  }

  /**
   * @description
   * Change size of products.
   *
   * @returns
   */
  public onChangeSize() {
    this.products = this._products.slice(0, this.size);
  }

  /**
   * @description
   * Search in products.
   *
   * @returns
   */
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
