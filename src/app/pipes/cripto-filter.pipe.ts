import { Pipe, PipeTransform } from '@angular/core';
import { ICripto } from '../interfaces/i-cripto';

@Pipe({
  name: 'criptoFilter'
})
export class CriptoFilterPipe implements PipeTransform {

  transform(arrayCryptos: ICripto[], filterBy: string): ICripto[] {
    const filter = filterBy ? filterBy.toLocaleUpperCase() : null;
    return filter ?
      arrayCryptos.filter(cry => cry.T.toLocaleUpperCase().includes(filter))
      : arrayCryptos;
  }
}
