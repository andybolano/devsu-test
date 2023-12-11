import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list.component';
import { GeneralRequestService } from '@lib/common-services/general-request';
import { of } from 'rxjs';
import { environment } from '@env';

const mockEndPoints = {
    get: `${environment.urlApi}/products`
}
describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;
    let generalRequestServiceSpy: jest.Mocked<GeneralRequestService>;

    beforeEach(() => {
        const spyRequest = {
            get: jest.fn(),
        };
        TestBed.configureTestingModule({
            declarations: [],
            imports: [RouterTestingModule, ReactiveFormsModule],
            providers: [
                { provide: GeneralRequestService, useValue: spyRequest },
            ],
        });

        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
        generalRequestServiceSpy = TestBed.inject(
            GeneralRequestService
        ) as jest.Mocked<GeneralRequestService>;
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set searchValue when setSearchValue is called', () => {
        const testValue = 'test';
        component.setSearchValue(testValue);
        expect(component.searchValue).toEqual(testValue);
    });

    it('should call generalRequestService.get and update products on getProducts', () => {
        const mockProducts = [{ id: '1', name: 'Product 1' }];
        jest.spyOn(generalRequestServiceSpy, 'get').mockReturnValue(of(mockProducts));
        component.getProducts();
        expect(generalRequestServiceSpy.get).toHaveBeenCalledWith(
            mockEndPoints.get
        );
        expect(component.products).toEqual(mockProducts);
    });

    it('should navigate to "products/register" on redirectToAdd', () => {
        const routerSpy = jest.spyOn((component as any).router, 'navigate');
    
        component.redirectToAdd();
    
        expect(routerSpy).toHaveBeenCalledWith(['products/register']);
    });
    
    it('should update limit when setLimit is called', () => {
        const testLimit = 10;
        component.setLimit(testLimit);
        expect(component.limit).toEqual(testLimit);
    });
});