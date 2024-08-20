import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Product } from '../interfaces/product';

export function validateMinDateFn(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const todayString = new Date().toISOString().split('T')[0];
    const controlDate = new Date(control?.value).toISOString().split('T')[0];

    if (control.value && controlDate < todayString) {
      return { validateDate: { value: control.value } };
    }
    return null;
  };
}

export function validateIdInApi(service: ProductService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    return service.getProduct(control.value).pipe(
      map((product: Product) => (product ? { idValidation: true } : null)),
      catchError(() => of(null))
    );
  };
}
