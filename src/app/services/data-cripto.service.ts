import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICripto } from '../interfaces/i-cripto';

@Injectable({
  providedIn: 'root'
})
export class DataCriptoService {

  private allCryptosURL: string | undefined;

  constructor(private http: HttpClient) { }

  getAllCryptos():Observable<ICripto[]> {
    this.allCryptosURL = `https://api.polygon.io/v2/aggs/grouped/locale/global/market/crypto/${this.getFecha()}?adjusted=true&apiKey=eCI2fh7a4zipFKtXBhTX5zDvr_6V3whw`;
    return this.http.get<any>(this.allCryptosURL).pipe(map(datos => {
      return datos.results;
    }));
  }

  getFecha() {
    let fecha = new Date();
    let anyoActual = fecha.getFullYear();
    let mesActual = fecha.getMonth() + 1;
    let hoy = fecha.getDate() - 1 ;

    if (mesActual <= 9) {
      let FA = anyoActual + "-0" + mesActual + "-" + hoy;
      return FA;
    }

    if (hoy == 0) {
      let ac = "31";
      let mesMod = mesActual - 1;
      if ( mesMod <= 9 ) {
        let FA = anyoActual + "-0" + mesMod + "-" + ac;
        return FA;
      } else {
        let FA = anyoActual + "-" + mesActual + "-" + ac;
        return FA;
      }
    } else {
      if (hoy <= 9) {
        let ac = "0" + hoy;
        if (mesActual <= 9) {
          let FA = anyoActual + "-0" + mesActual + "-" + ac;
          return FA;
        } else {
          let FA = anyoActual + "-" + mesActual + "-" + ac;
          return FA;
        }
      } else {
        let FA = anyoActual + "-" + mesActual + "-" + hoy;
        return FA;
      }
    }

  }

}
