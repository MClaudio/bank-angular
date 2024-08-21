import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductComponent } from './form-product.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormProductComponent', () => {
  let component: FormProductComponent;
  let fixture: ComponentFixture<FormProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [FormProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormProductComponent);
    component = fixture.componentInstance;

    component.form = TestBed.inject(FormBuilder).group({
      id: [null],
      name: [null],
      description: [null],
      logo: [null],
      date_release: [null],
      date_revision: [{ value: null, disabled: true }],
    });

    component.acction = 'new';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
