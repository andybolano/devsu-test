import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneralRequestService } from '@lib/common-services/general-request';
import { ButtonComponent } from '@lib/ui-components/button/button.component';
import { InputComponent } from '@lib/ui-components/input/input.component';
import { EndPoints } from '@shared/dictionaries/end-points/end-points';
import { Product } from '@shared/interfaces/product.interface';
import { RegisterProductForm } from '@shared/interfaces/register-product-form.interface';
import { formatDate } from '@shared/utils/formatDate';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import dayjs from 'dayjs';

@Component({
    selector: 'app-product-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputComponent,
        ButtonComponent,
    ],
    templateUrl: './product-register.component.html',
    styleUrl: './product-register.component.scss'
})
export class ProductRegisterComponent {
    public registerProductForm: FormGroup;
    public loading: boolean = false;

    constructor (
        private readonly generalRequestService: GeneralRequestService,
        private readonly endPoints: EndPoints,
        private readonly formConstructor: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.registerProductForm = this.getRegisterProductForm();
        this.listenDateRelease()
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

    private listenDateRelease (): void {
        this.registerProductForm.get('date_release')?.valueChanges
            .subscribe((value: string) => {
                this.setValueDateRevision(value)
            })
    }

    private setValueDateRevision (value: string): void {
        this.registerProductForm.get('date_revision')?.setValue(this.addMonthsToDate(value))
    }

    private addMonthsToDate (inputDate: string, monthsToAdd: number = 1): string {
        const date = dayjs(inputDate);
        const newDate = date.add(monthsToAdd, 'month');
        return newDate.format('YYYY-MM-DD');
    }

    public submitForm (): void {
        if (!this.registerProductForm.valid) {
            return
        }

        this.loading = true
        this.generalRequestService.post<Product, Product>(this.endPoints.products().save(), this.registerProductForm.value)
            .pipe(
                map((response: Product) => response),
                finalize((): boolean => this.loading = false),
                catchError((error: HttpErrorResponse): Observable<never> => this.error(error))
            )
            .subscribe({
                next: (response: Product) => this.resolveSaved(response)
            });
    }
    
    private error(error: HttpErrorResponse): Observable<never> {
        alert(error.error)
        return throwError(() => error);
    }

    private resolveSaved (response: Product): void {
        this.resetForm()
    }

    public resetForm (): void {
        this.registerProductForm.reset()
    }
}
