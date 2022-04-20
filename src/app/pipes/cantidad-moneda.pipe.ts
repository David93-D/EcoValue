import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cantidadMoneda'
})
export class CantidadMonedaPipe implements PipeTransform {

  transform(value: number) {
    return value.toString().slice(0, 5);
  }

}