import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  validateIdInApi,
  validateMinDateFn,
} from '../../../../core/utils/formValidators';
import { ProductService } from '../../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductEditComponent {
  public form!: FormGroup;
  public acction: string = 'edit';
  private _id: string;

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _route: ActivatedRoute
  ) {
    let params: any = this._route.snapshot.params;
    this._id = params.id;
    if (!this._id) {
      window.history.back();
    }
    console.log('id', this._id);
    this.loadProduct();
  }

  private async loadProduct() {
    try {
      let resp = await firstValueFrom(
        this._productService.getProduct(this._id)
      );
      console.log('resp', resp);
      this.loadForm();
      this.form.patchValue(resp);
    } catch (error) {
      window.history.back();
      console.log(error);
    }
  }

  private loadForm() {
    this.form = this._fb.group({
      id: [{ value: null, disabled: true }],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: [null, [Validators.required]],
      date_release: [null, [Validators.required, validateMinDateFn()]],
      date_revision: [{ value: null, disabled: true }, [Validators.required]],
    });
  }
}
