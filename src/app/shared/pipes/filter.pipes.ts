import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "dataFilter",
    standalone: true,
})
export class DataFilterPipe implements PipeTransform {
    transform<T>(items: T[], filter: string): T[] {
    if(!items || !filter) {
        return items;
    }
    return items.filter(item => JSON.stringify(item).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
}