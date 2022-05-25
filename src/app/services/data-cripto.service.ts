import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ICripto } from '../interfaces/i-cripto';
import { IInfoCripto } from '../interfaces/i-info-cripto';
import { IPrecioCripto } from '../interfaces/i-precio-cripto';

@Injectable({
  providedIn: 'root'
})
export class DataCriptoService {

  criptosSubject = new Subject<IInfoCripto[]>();

  arrayURL = [
    "https://api.polygon.io/v3/reference/tickers?market=crypto&active=true&sort=ticker&order=asc&limit=10"
  ]

  constructor(private http: HttpClient) { }

  getAllCryptos() {
    let allCryptosURL = "";
    allCryptosURL = this.arrayURL[this.arrayURL.length-1];
    this.http.get<any>(allCryptosURL).pipe(map(datos => {
      this.arrayURL.push(datos.next_url);
      return datos.results;
    })).subscribe(values => this.criptosSubject.next(values));
  }

  getAllCryptosPages(num: number) {
    let allCryptosURL = this.arrayURL[this.arrayURL.length-num];
    this.http.get<any>(allCryptosURL).pipe(map(datos => {
      if (num == 3) {
        this.arrayURL.pop();
      } else {
        this.arrayURL.push(datos.next_url);
      }
      return datos.results;
    })).subscribe(values => this.criptosSubject.next(values));
  }

  getDatosPrecio(ticker: string, inicio_fecha:string, ultima_fecha: string) {
    let cripto_price = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/month/${inicio_fecha}/${ultima_fecha}?adjusted=true&sort=asc&limit=50000`;
    return this.http.get<any>(cripto_price).pipe(map(p => {
      return p.results.map((d: IPrecioCripto) => {
        return d;
      });
    }));
  }

  searchCriptos(stringBuscar: string) {
    let stocks_buscar = `https://api.polygon.io/v3/reference/tickers?market=crypto&search=${stringBuscar}&active=true&sort=ticker&order=asc&limit=10`;
    return this.http.get<any>(stocks_buscar).pipe(map(datos => {
      return datos.results;
    })).subscribe(values => this.criptosSubject.next(values))
  }

}
