import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '../../../../core/interfaces/product';
import { ProductService } from '../../../../services/product.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss',
})
export class FormProductComponent {
  @Input() form!: FormGroup;
  @Input() acction!: string;

  constructor(private _productService: ProductService) {}

  public getErrorRequired(field: string) {
    return (
      this.form.get(field)?.hasError('required') &&
      this.form.get(field)?.touched
    );
  }

  public getErrorMinDate(field: string) {
    return (
      this.form.get(field)?.hasError('validateDate') &&
      this.form.get(field)?.touched
    );
  }

  public getErrorIdValidate(field: string) {
    return (
      this.form.get(field)?.hasError('idValidation') &&
      this.form.get(field)?.touched
    );
  }

  public getErrorMax(field: string) {
    return (
      this.form.get(field)?.hasError('maxlength') &&
      this.form.get(field)?.touched
    );
  }

  public getErrorMin(field: string) {
    return (
      this.form.get(field)?.hasError('minlength') &&
      this.form.get(field)?.touched
    );
  }

  public onChangeDate() {
    let dateAddYear = new Date(this.form.get('date_release')?.value);
    dateAddYear.setFullYear(dateAddYear.getFullYear() + 1);
    this.form
      .get('date_revision')
      ?.setValue(dateAddYear.toISOString().split('T')[0]);
  }

  public async onSaveForm() {
    console.log(this.form);
    this.form.markAllAsTouched();
    console.log('form invalid', this.form.invalid);
    if (this.form.invalid) return;

    console.log(this.form.getRawValue());
    try {
      let data: Product = {
        ...this.form.getRawValue(),
        date_release: new Date(this.form.get('date_release')?.value)
          .toISOString()
          .split('T')[0],
        date_revision: new Date(this.form.get('date_revision')?.value)
          .toISOString()
          .split('T')[0],
      };
      console.log('data send', data);
      if (this.acction === 'new') {
        await this.createProduct(data);
      } else {
        await this.updateProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async createProduct(data: Product) {
    try {
      let resp = await firstValueFrom(this._productService.createProduct(data));
      console.log('createProduct', resp);
    } catch (error) {
      throw error;
    }
  }

  private async updateProduct(data: Product) {
    try {
      let resp = await firstValueFrom(this._productService.updateProduct(data));
      console.log('updateProduct', resp);
    } catch (error) {
      throw error;
    }
  }
}
