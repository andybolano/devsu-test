import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {
    transform<T>(value: T[], limit: number): T[] {
        return value.slice(0, limit);
    }
}
