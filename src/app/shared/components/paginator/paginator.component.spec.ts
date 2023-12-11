import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
    let component: PaginatorComponent;
    let fixture: ComponentFixture<PaginatorComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    beforeEach((): void => {
        fixture = TestBed.createComponent(PaginatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit onLimitChange event', () => {
        const limit = 10;
        const spy = jest.spyOn(component.onLimitChange, 'emit');
        const eventMock = { target: { value: limit } } as any;

        component.changeLimit(eventMock);

        expect(spy).toHaveBeenCalledWith(limit);
    });
});