import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    pure: true,
    standalone: true,
    name: 'calculateLimits'
})
export class CalculateLimitsPipe implements PipeTransform {
    transform(value: number): number[] {
        let limiteBase = 5;
        const itemsLength = value;

        const limitesCalculados = Array.from({ length: Math.log2(itemsLength / limiteBase) + 1 },
            (_, index) => limiteBase * 2 ** index
        );
        return limitesCalculados.concat(itemsLength);
    }
}
