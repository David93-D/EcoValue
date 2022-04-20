import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FundamentalesValoresService {

  constructor(private http: HttpClient) { }

  getFundamentales(tickerBuscar: string, anyo: number) {
    let fundamentalesURL = `https://api.polygon.io/vX/reference/financials?ticker=${tickerBuscar}&period_of_report_date=${anyo}-12-31&timeframe=annual`;
    return this.http.get<any>(fundamentalesURL).pipe(map(datos => {
      return datos.results[0].financials;
    }))
  }

}
