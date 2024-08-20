import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../core/interfaces/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _api: string;
  constructor(private _http: HttpClient) {
    this._api = environment.api;
  }

  public getProducts(): Observable<Product[]> {
    return this._http
      .get<Product[]>(`${this._api}/products`)
      .pipe(map((response: any) => response.data));
  }

  public getProduct(id: string): Observable<Product> {
    return this._http
      .get<Product>(`${this._api}/products/${id}`)
      .pipe(map((response: any) => response));
  }

  public createProduct(product: Product): Observable<Product> {
    return this._http
      .post<Product>(`${this._api}/products`, product)
      .pipe(map((response: any) => response.data));
  }

  public updateProduct(product: Product): Observable<Product> {
    return this._http
      .put<Product>(`${this._api}/products/${product.id}`, product)
      .pipe(map((response: any) => response.data));
  }

  public deleteProduct(id: string): Observable<any> {
    return this._http.delete<any>(`${this._api}/products/${id}`);
  }
}
