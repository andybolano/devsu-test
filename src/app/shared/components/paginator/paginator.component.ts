import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dev-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() public countItems: number = 0;
  @Input() public paginationRanges: number[] = [];

  @Output() private readonly onLimitChange: EventEmitter<number> = new EventEmitter();

  public changeLimit( event: Event ): void {
    this.onLimitChange.emit(+(event.target as HTMLTextAreaElement).value);
  }
}
