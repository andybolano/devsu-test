import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dev-table',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableComponent {
    @Input() headerTemplate!: TemplateRef<unknown>;
    @Input() bodyTemplate!: TemplateRef<unknown>;
    @Input() footerTemplate!: TemplateRef<unknown>;
}
