import { AbstractControl, FormGroup } from '@angular/forms';
import { Product } from './product.interface';

type RegisterFormControl = { [key in keyof Product]: AbstractControl }
export type RegisterProductForm = FormGroup & { value: Product, controls: RegisterFormControl}