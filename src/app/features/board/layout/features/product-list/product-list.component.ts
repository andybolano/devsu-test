import { Component, OnInit } from '@angular/core';
import { TableComponent } from '@lib/ui-components/table/table.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { GeneralRequestService } from '@lib/common-services/general-request';
import { Observable, catchError, debounceTime, finalize, map, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonComponent } from '@lib/ui-components/button/button.component';
import { InputComponent } from '@lib/ui-components/input/input.component';
import { EndPoints } from '@shared/dictionaries/end-points/end-points';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchForm } from '@shared/interfaces/search-form.interface';
import { Product } from '@shared/interfaces/product.interface';
import { DataFilterPipe } from '@shared/pipes/filter.pipes';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { LimitToPipe } from '@shared/pipes/limit.pipes';
import { CalculateLimitsPipe } from '@shared/pipes/calculateLimits.pipes';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [
        TableComponent,
        CommonModule,
        NgOptimizedImage,
        ButtonComponent,
        InputComponent,
        ReactiveFormsModule,
        FormsModule,
        DataFilterPipe,
        PaginatorComponent,
        LimitToPipe,
        CalculateLimitsPipe,
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {

    public searchForm: FormGroup;
    public searchValue: string = '';
    public loading: boolean = false;
    public products: Product[] = [];
    public limit: number = 5;

    constructor(
        private readonly router: Router, 
        private readonly generalRequestService: GeneralRequestService,
        private readonly endPoints: EndPoints,
        private readonly formConstructor: FormBuilder,
    ) {

    }

    ngOnInit() {
        this.getProducts();
        this.searchForm = this.getSearchForm();
        this.initReactiveSearchListener()
    }

    private getProducts(): void {
        this.loading = true
        this.generalRequestService.get<Product[]>(this.endPoints.products().getAll())
            .pipe(
                map((response: Product[]) => response),
                finalize((): boolean => this.loading = false),
                catchError((error: HttpErrorResponse): Observable<never> => this.error(error))
            )
            .subscribe({
                next: (response: Product[]) => this.resolveDetail(response)
            });
    }

    private resolveDetail(products: Product[]) {
        this.products = products;
    }

    private error(error: HttpErrorResponse): Observable<never> {
        return throwError(error);
    }

    private getSearchForm (): FormGroup {
        return this.formConstructor.group({
            searchInput:  ['', [ Validators.required]]
        }) as SearchForm;
    }

    private initReactiveSearchListener(): void {
        const timer: number = 500;
        this.searchForm.controls['searchInput'].valueChanges.pipe(debounceTime(timer)).subscribe(change => {
            this.setSearchValue(change);
        });
    }

    public setSearchValue(valueToSearch: string): void {
        this.searchValue = valueToSearch || this.searchForm.get('searchInput')?.value;
    }

    public redirectToAdd(): void {
        this.router.navigate(['products/register']);
    }
    
    public setLimit(limit: number): void {
        this.limit = limit
    }
}
