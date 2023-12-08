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
    ReactiveFormsModule 
} from '@angular/forms';

export const INPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => InputComponent ),
    multi: true
  };
  
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
    @Input() validateThisEntry: boolean;

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
        try {
            this.control = this.injector.get(NgControl);
        } catch (error) {
            this.validateThisEntry = false;
        }
    }

    get isValid(): boolean {
        return this.control?.valid ? true : false;
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

    public setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.cd.markForCheck();
    }

    public writeValue(value: unknown): void {
        if (this.inputViewChild?.nativeElement) {
            this.setInitialValueControl(value);
        }
    }

    private setInitialValueControl(value: unknown) {
        if (value === undefined || value === null) {
            this.inputViewChild.nativeElement.value = '';
        } else {
            this.inputViewChild.nativeElement.value = value;
        }
    }
}
