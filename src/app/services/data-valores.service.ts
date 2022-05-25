import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { IInfoValor } from '../interfaces/i-info-valor';
import { INewsValor } from '../interfaces/i-news-valor';
import { IPosicion } from '../interfaces/i-posicion';
import { IPrecioValor } from '../interfaces/i-precio-valor';
import { IRentPos } from '../interfaces/i-rent-pos';

@Injectable({
  providedIn: 'root'
})
export class DataValoresService {

  valoresSubject = new Subject<IInfoValor[]>();

  opVal = new Subject<IInfoValor[]>();

  rentSubject = new Subject<IRentPos[]>();

  arrayURL = [
    "https://api.polygon.io/v3/reference/tickers?type=CS&active=true&sort=ticker&order=asc&limit=10"
  ]

  constructor(private http: HttpClient) { }

  getAllStocks() {
    let allStocksURL = "";
    allStocksURL = this.arrayURL[this.arrayURL.length-1]; // OBTENEMOS LA ULTIMA POSICÍON
    this.http.get<any>(allStocksURL).pipe(map(datos => {
      this.arrayURL.push(datos.next_url);
      return datos.results;
    })).subscribe(values => this.valoresSubject.next(values))
  }

  getAllStocksPages(num: number) {
    let allStocksURL = this.arrayURL[this.arrayURL.length-num];
    this.http.get<any>(allStocksURL).pipe(map(datos => {
      if (num == 3) {
        this.arrayURL.pop();
      } else {
        this.arrayURL.push(datos.next_url);
      }
      return datos.results;
    })).subscribe(values => this.valoresSubject.next(values))
  }

  getDatosPrecio(ticker: string,inicio_fecha:string, ultima_fecha: string) {
    let stock_price = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/month/${inicio_fecha}/${ultima_fecha}?adjusted=true&sort=asc&limit=50000`;
    return this.http.get<any>(stock_price).pipe(map(p => {
      return p.results.map((d: IPrecioValor) => {
        return d;
      });
    }));
  }

  getNewsStocks(ticker: string) {
    let stock_news = `https://api.polygon.io/v2/reference/news?ticker=${ticker}`;
    return this.http.get<any>(stock_news).pipe(map(p => {
      return p.results.map((n: INewsValor) => {
        return n;
      });
    }));
  }

  searchStocks(stringBuscar: string) {
    let stocks_buscar = `https://api.polygon.io/v3/reference/tickers?type=CS&search=${stringBuscar}&active=true&sort=ticker&order=asc&limit=10`;
    return this.http.get<any>(stocks_buscar).pipe(map(datos => {
      return datos.results;
    })).subscribe(values => this.valoresSubject.next(values))
  }
  
  opcionesValores(stringBuscar: string) {
    let valores_buscar = `https://api.polygon.io/v3/reference/tickers?type=CS&search=${stringBuscar}&active=true&sort=ticker&order=asc&limit=3`;
    return this.http.get<any>(valores_buscar).pipe(map(d => {      
      return d.results;
    })).subscribe(values => this.opVal.next(values));
  }

  getPrecioValor(valor: string) {
    let urlPrecioValor = `https://api.polygon.io/v2/aggs/ticker/${valor}/prev?adjusted=true&apiKey=eCI2fh7a4zipFKtXBhTX5zDvr_6V3whw`;
    return this.http.get<any>(urlPrecioValor).pipe(map(datos => {
      return datos.results[0].c;
    }));
  }

  preciosActualizados() {               
    let urlActualizados = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${this.getFecha()}?adjusted=true&apiKey=eCI2fh7a4zipFKtXBhTX5zDvr_6V3whw`;
    return this.http.get<any>(urlActualizados).pipe(map(datos => {
      return datos.results
    }));
  }

  getFecha() {
    let fecha = new Date();
    let anyoActual = fecha.getFullYear();
    let mesActual = fecha.getMonth() + 1;
    let hoy = fecha.getDate() - 1 ;

    if (mesActual <= 9) {
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
            if (mesActual <= 9) {
              let FA = anyoActual + "-0" + mesActual + "-" + hoy;
              return FA;
            } else {
              let FA = anyoActual + "-" + mesActual + "-" + hoy;
              return FA;
            }
          }
        }
    } else {
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
}