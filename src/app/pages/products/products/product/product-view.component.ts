import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  validateIdInApi,
  validateMinDateFn,
} from '../../../../core/utils/formValidators';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductViewComponent {
  public form!: FormGroup;
  public acction: string = 'view';
  private _id: string;

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _modalService: ModalService
  ) {
    let params: any = this._route.snapshot.params;
    this._id = params.id;
    if (!this._id) {
      window.history.back();
    }
    this.loadProduct();
  }

  private async loadProduct() {
    try {
      let resp = await firstValueFrom(
        this._productService.getProduct(this._id)
      );
      this.loadForm();
      this.form.patchValue(resp);
    } catch (error: any) {
      window.history.back();
      console.log(error);
      this._modalService.openModal(
        'error',
        'Error',
        error?.error?.message || error?.message || JSON.parse(error)
      );
    }
  }

  private loadForm() {
    this.form = this._fb.group({
      id: [{ value: null, disabled: true }],
      name: [{ value: null, disabled: true }],
      description: [{ value: null, disabled: true }],
      logo: [{ value: null, disabled: true }],
      date_release: [{ value: null, disabled: true }],
      date_revision: [{ value: null, disabled: true }],
    });
  }
}
