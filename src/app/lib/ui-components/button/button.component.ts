import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, Output
} from '@angular/core';

@Component({
    selector: 'dev-button',
    standalone: true,
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    @Input() public buttonId: string = '';
    @Input() public label: string = '';
    @Input() public type: string = 'button';

    @Output() public onBlur: EventEmitter<Event> = new EventEmitter();
    @Output() public onClick: EventEmitter<Event> = new EventEmitter();
    @Output() public onFocus: EventEmitter<Event> = new EventEmitter();
}