import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@lib/ui-components/input/input.component';
import { RegisterProductForm } from '@shared/interfaces/register-product-form.interface';

@Component({
    selector: 'app-product-register',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        InputComponent,
    ],
    templateUrl: './product-register.component.html',
    styleUrl: './product-register.component.scss'
})
export class ProductRegisterComponent {
    public registerProductForm: FormGroup;

    constructor (private readonly formConstructor: FormBuilder) {

    }

    ngOnInit(): void {
        this.registerProductForm = this.getRegisterProductForm();
    }

    private getRegisterProductForm (): FormGroup {
         return this.formConstructor.group({
            id:  ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
            name:  ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
            description:  ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
            logo:  ['', [ Validators.required]],
            date_release:  ['', [ Validators.required]],
            date_revision:  ['', [ Validators.required]],
        }) as RegisterProductForm;
    }
}
