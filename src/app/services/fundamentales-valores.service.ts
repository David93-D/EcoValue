import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IBalance } from 'src/app/interfaces/i-balance';
import { ICashFlow } from '../interfaces/i-cash-flow';
import { IIncome } from '../interfaces/i-income';

@Injectable({
  providedIn: 'root'
})
export class FundamentalesValoresService {

  empresaFalsa = { 0 : 
    { 
      "cash_flow_statement": { 
        "net_cash_flow": { "value": 0 },
        "net_cash_flow_from_financing_activities": { "value": 0 },
        "net_cash_flow_from_investing_activities": { "value": 0 },
        "net_cash_flow_from_operating_activities": { "value": 0 }
      }, 
      "income_statement": { 
        "revenues": { "value": 0 },
        "cost_of_revenue": { "value": 0 },
        "costs_and_expenses": { "value": 0 },
        "benefits_costs_expenses": { "value": 0 },
        "operating_income_loss": { "value": 0 },
        "income_loss_from_equity_method_investments": { "value": 0 },
        "interest_expense_operating": { "value": 0 },
        "income_loss_from_continuing_operations_before_tax": { "value": 0 },
        "income_loss_from_continuing_operations_after_tax": { "value": 0 },
      }, 
      "balance_sheet": { 
        "assets": { "value": 0 }, 
        "noncurrent_assets": { "value": 0 },
        "current_assets": { "value": 0 }, 
        "liabilities": { "value": 0 }, 
        "noncurrent_liabilities": { "value": 0 }, 
        "current_liabilities": { "value": 0 }, 
        "equity": { "value": 0 },
        "RCalidadDeuda": { "value": 0 },
        "RLiquidez": { "value": 0 },
        "Rdeuda": { "value": 0 },
      } 
    }, 
  }

  fundamentalesSubject = new BehaviorSubject<{ [key: string]: { [key: string]: { balance_sheet: IBalance, income_statement: IIncome, cash_flow_statement: ICashFlow } } }>({ 0: this.empresaFalsa });
  empresaFundSubject = new BehaviorSubject<{ [key: string]: { balance_sheet: IBalance, income_statement: IIncome, cash_flow_statement: ICashFlow } }>(this.empresaFalsa);

  constructor(private http: HttpClient) { }

  obtenerAnyos() {
    let anyo_actual = new Date().getFullYear() - 1;
    let array_anyos = [anyo_actual];
    for (let index = 1; index <= 3; index++) {
      let anyo_s = anyo_actual - index;
      array_anyos.push(anyo_s);
    }
    array_anyos.reverse();
    return array_anyos;
  }

  getFundamentales(tickerBuscar: string) {
    let fund = this.fundamentalesSubject.getValue();
    if (!(tickerBuscar in fund)) {
      fund[tickerBuscar] = {};
      for (let anyo of this.obtenerAnyos()) {
        let fundamentalesURL = `https://api.polygon.io/vX/reference/financials?ticker=${tickerBuscar}&period_of_report_date=${anyo}-12-31&timeframe=annual`;
        const obsFundamentales = this.http.get<{ [key: string]: any }>(fundamentalesURL)
          .pipe(
            map(datos => datos["results"][0].financials))
          .subscribe(datos => {
            datos.balance_sheet['Rdeuda'] = { value: datos.balance_sheet.liabilities.value / datos.balance_sheet.equity.value };
            datos.balance_sheet['RCalidadDeuda'] = { value: datos.balance_sheet.current_liabilities.value / datos.balance_sheet.liabilities.value };
            datos.balance_sheet['RLiquidez'] = { value: datos.balance_sheet.current_assets.value / datos.balance_sheet.current_liabilities.value };
            fund[tickerBuscar][anyo] = datos;
            console.log(datos, fund);
            this.fundamentalesSubject.next(fund);
            this.empresaFundSubject.next(fund[tickerBuscar])
          });
      }

    }
    else {
      this.empresaFundSubject.next(fund[tickerBuscar]);
    }

    return this.empresaFundSubject;
  }

}