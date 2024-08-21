import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  validateIdInApi,
  validateMinDateFn,
  validateUrl,
} from '../../../../core/utils/formValidators';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  public form!: FormGroup;
  public acction: string = 'new';

  /**
   * @description
   * Constructor
   *
   * @param {FormBuilder} _fb - FormBuilder
   * @param {ProductService} _productService - ProductService
   */
  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService
  ) {
    this.loadForm();
  }

  /**
   * @description
   * creates the form group.
   *
   * @returns
   */
  private loadForm() {
    this.form = this._fb.group({
      id: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        [validateIdInApi(this._productService)],
      ],
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
      logo: [null, [Validators.required, validateUrl()]],
      date_release: [null, [Validators.required, validateMinDateFn()]],
      date_revision: [{ value: null, disabled: true }, [Validators.required]],
    });
  }
}
