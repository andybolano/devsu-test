import { environment } from '@env';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ProductRegisterComponent } from './product-register.component';
import { GeneralRequestService } from '@lib/common-services/general-request';

const mockEndPoints = {
    save: `${environment.urlApi}/products`
}

describe('ProductRegisterComponent', () => {
    let component: ProductRegisterComponent;
    let fixture: ComponentFixture<ProductRegisterComponent>;
    let generalRequestServiceSpy: jest.Mocked<GeneralRequestService>;

    beforeEach(() => {
        const spyRequest =  {
            post: jest.fn(),
        };

        TestBed.configureTestingModule({
            declarations: [],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: GeneralRequestService, useValue: spyRequest },
            ],
        });

        fixture = TestBed.createComponent(ProductRegisterComponent);
        component = fixture.componentInstance;
        generalRequestServiceSpy = TestBed.inject(
            GeneralRequestService
        ) as jest.Mocked<GeneralRequestService>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should reset the form on resetForm', () => {
        component.ngOnInit();
        component.resetForm();
        expect(component.registerProductForm.valid).toBeFalsy();
    });


    it('should initialize the form on ngOnInit', () => {
        component.ngOnInit();
        expect(component.registerProductForm).toBeTruthy();
    });

    it('should reset the form on resetForm', () => {
        component.ngOnInit();
        component.resetForm();
        expect(component.registerProductForm.valid).toBeFalsy();
    });

    it('should set value of date_revision when date_release changes', () => {
        const dateRelease = '2023-12-01';
        const expectedDateRevision = '2024-01-01';

        component.ngOnInit();
        component.registerProductForm.get('date_release')?.setValue(dateRelease);

        expect(component.registerProductForm.get('date_revision')?.value).toEqual(expectedDateRevision);
    });

    it('should submit form and handle success', () => {
        component.ngOnInit();
        const mockProduct = { 
            "date_release": "2023-12-01", 
            "date_revision": "2024-01-01", 
            "description": "Lorem ipsum", 
            "id": "123-abc", 
            "logo": "https://picsum.photos/id/1/200", 
            "name": "Credit Card"
        }
    
        component.registerProductForm.setValue(mockProduct)
        jest.spyOn(generalRequestServiceSpy, 'post').mockReturnValue(of(mockProduct));

        component.submitForm();
       
        expect(generalRequestServiceSpy.post).toHaveBeenCalledWith(
            mockEndPoints.save,
            mockProduct
        );
        expect(component.loading).toBe(false);

    });
});