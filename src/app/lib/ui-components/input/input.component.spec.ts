import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { NgControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {

        const ngControlMock = {
            control: {
                value: '',
                setValue: jest.fn(),
            },
            touched: false,
            dirty: false,
            invalid: false,
            value: '',
        };

        await TestBed.configureTestingModule({
            imports: [InputComponent],
            providers: [
                { provide: NgControl, useValue: ngControlMock },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set initial value', () => {
        const testValue = 'Test';
        component.writeValue(testValue);
        fixture.detectChanges();
        expect(component.inputViewChild.nativeElement.value).toBe(testValue);
    });

    it('should call onInputBlur when input blurs', () => {
        jest.spyOn(component, 'onInputBlur');
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        inputElement.dispatchEvent(new Event('blur'));
        expect(component.onInputBlur).toHaveBeenCalled();
    });

    it('should call onInputChange when input changes', () => {
        jest.spyOn(component, 'onInputChange');
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        inputElement.dispatchEvent(new Event('input'));
        expect(component.onInputChange).toHaveBeenCalled();
    });

});
