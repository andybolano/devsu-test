import { CommonModule } from '@angular/common';
import { 
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter, 
    INJECTOR,
    Inject,
    Injector,
    Input,
    OnInit,
    Output, 
    ViewChild,
    ViewEncapsulation,
    forwardRef 
} from '@angular/core';
import { 
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
    NgControl,
    ReactiveFormsModule, 
    ValidationErrors
} from '@angular/forms';

export const INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => InputComponent ),
    multi: true
};

interface ErrorMessageObject {
    [key: string]: (params: any) => string;
}
  
@Component({
    selector: 'dev-input',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
    providers: [ INPUT_VALUE_ACCESSOR ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit, ControlValueAccessor, AfterViewChecked {
    @Input() type: string = 'text';
    @Input() inputLabel: string;
    @Input() inputId: string;
    @Input() placeholder: string;
    @Input() disabled: boolean;
    @Input() name: string;
    @Input() required: boolean;
    @Input() readonly: boolean;

    @ViewChild('input', { static: true }) inputViewChild: ElementRef;

    @Output() onFocus: EventEmitter<Event> = new EventEmitter();
    @Output() onBlur: EventEmitter<Event> = new EventEmitter();
    @Output() onInput: EventEmitter<Event> = new EventEmitter();
    @Output() onKeydown: EventEmitter<KeyboardEvent> = new EventEmitter();
    @Output() onKeyPress: EventEmitter<KeyboardEvent> = new EventEmitter();
    @Output() onKeyUp: EventEmitter<KeyboardEvent> = new EventEmitter();
    @Output() emitInputViewChild: EventEmitter<ElementRef> = new EventEmitter();


    public onModelChange: Function = (): void => {/*intentional*/ };
    public onModelTouched: Function = (): void => {/*intentional*/ };
    public filled: boolean;
    public focusText: string;
    public showCaptionContent: boolean;
    private control: NgControl;

    public errorMessage: ErrorMessageObject = {
        'required'  : ()  => `Este campo es requerido`,
        'maxlength' : (params: any)  => `Maxino ${params.requiredLength} caracteres permitidos`,
        'minlength' : (params: any)  => `Minimo ${params.requiredLength} caracteres permitidos`,
    };

    constructor(
        private readonly cd: ChangeDetectorRef,
        @Inject(INJECTOR) private readonly injector: Injector
    ) {
        this.focusText = '';
        this.filled = false;
        this.showCaptionContent = false;
    }

    public ngAfterViewChecked(): void {
        this.cd.detectChanges();
        this.emitInputViewChild.emit(this.inputViewChild);
    }

    public ngOnInit(): void {
        this.control = this.injector.get(NgControl);
    }

    get isInvalid(): boolean {
        return !!(this.control?.invalid && (this.control?.dirty || this.control?.touched))
    }

    public listErrors(): string[] {
        const errors = this.control.errors;

        if (!this.isInvalid || !errors ) {
            return [];
        }

       return Object.keys(errors)
            .filter(error => this.control.touched || this.control.dirty)
            .map(error => this.errorMessage[error](errors[error] as ValidationErrors));
    }

    public onInputBlur(event: Event): void {
        this.onModelTouched();
        this.onBlur.emit(event);
    }

    public onInputChange(event: Event): void {
        this.onModelChange((event.target as HTMLInputElement).value);
        this.onModelTouched();
        this.onInput.emit(event);
    }

    public onInputFocus(event: Event): void {
        if (this.readonly) {
            return;
        }
        this.onFocus.emit(event);
    }

    public onInputKeyPress(event: KeyboardEvent) {
        if (this.type === 'number' && event.key === 'e') {
            event.preventDefault();
        }

        if (this.readonly) {
            return;
        }
        this.onKeyPress.emit(event);
    }

    public onInputKeydown(event: KeyboardEvent) {
        if (this.readonly) {
            return;
        }
        this.onKeydown.emit(event);
    }

    public onInputKeyUp(event: KeyboardEvent) {
        this.onKeyUp.emit(event);
    }

    public registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    public registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    public writeValue(value: unknown): void {
        if (this.inputViewChild?.nativeElement) {
            this.setInitialValueControl(value);
        }
    }

    private setInitialValueControl(value: unknown): void {
        this.inputViewChild.nativeElement.value = value === undefined || value === null ? '' : value
    }
}
