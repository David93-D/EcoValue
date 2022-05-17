import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { IFundamentales } from '../interfaces/i-fundamentales';

@Injectable({
  providedIn: 'root'
})
export class FundamentalesValoresService {

  empresaFalsa: { [key: string]: IFundamentales} = { "0" : 
    { 
      "cash_flow_statement": { 
        "net_cash_flow": { "value": 0 },
        "net_cash_flow_from_financing_activities": { "value": 0 },
        "net_cash_flow_from_investing_activities": { "value": 0 },
        "net_cash_flow_from_operating_activities": { "value": 0 },
        "CFdeuda": { "value": 0 },
        "CFopv": { "value": 0 }
      }, 
      "income_statement": { 
        "revenues": { "value": 0 },
        "cost_of_revenue": { "value": 0 },
        "costs_and_expenses": { "value": 0 },
        "benefits_costs_expenses": { "value": 0 },
        "operating_income_loss": { "value": 0 },
        "income_loss_from_equity_method_investments": { "value": 0 },
        "interest_expense_operating": { "value": 0 },
        "income_loss_from_continuing_operations_after_tax": { value: 0 },
        "income_loss_from_continuing_operations_before_tax": { "value": 0 },
        "net_income_loss_attributable_to_parent": { "value": 0 },
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
        "ROE": { "value": 0 },
        "ROA": { "value": 0 },
        "ROCE": { "value": 0 }
      },
      "fiscal_year": "0"
    }, 
  }

  fundamentalesSubject = new BehaviorSubject<{ [key: string]: { [key: string]: IFundamentales } }>({ "0": this.empresaFalsa });
  empresaFundSubject = new BehaviorSubject<{ [key: string]: IFundamentales  }>(this.empresaFalsa);

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

      let fundamentalesURL = `https://api.polygon.io/vX/reference/financials?ticker=${tickerBuscar}&timeframe=annual&limit=4`;

      const obsFundamentales = this.http.get<{results: { financials: IFundamentales, fiscal_year: string }[] }>(fundamentalesURL)
        .pipe(
          map(datos => datos.results.map((periodo) => { return {...periodo.financials, fiscal_year: periodo.fiscal_year}})))
        .subscribe(datos => {
          datos.forEach(dato => {
            dato.balance_sheet['Rdeuda'] = { value: dato.balance_sheet.liabilities.value / dato.balance_sheet.equity.value };
            dato.balance_sheet['RCalidadDeuda'] = { value: dato.balance_sheet.current_liabilities.value / dato.balance_sheet.liabilities.value };
            dato.balance_sheet['RLiquidez'] = { value: dato.balance_sheet.current_assets.value / dato.balance_sheet.current_liabilities.value };
            dato.balance_sheet['ROE'] = { value: (dato.balance_sheet.equity.value / dato.income_statement.income_loss_from_continuing_operations_after_tax.value) * 100 } 
            dato.balance_sheet['ROA'] = { value: dato.income_statement.income_loss_from_continuing_operations_after_tax.value / dato.balance_sheet.assets.value }
            dato.balance_sheet['ROCE'] = { value: dato.income_statement.operating_income_loss.value / (dato.balance_sheet.assets.value - dato.balance_sheet.current_liabilities.value) } 
            dato.cash_flow_statement['CFdeuda'] = { value: dato.balance_sheet.noncurrent_liabilities.value / dato.cash_flow_statement.net_cash_flow_from_financing_activities.value }
            dato.cash_flow_statement['CFopv'] = { value: dato.cash_flow_statement.net_cash_flow_from_operating_activities.value / dato.income_statement.revenues.value };
            fund[tickerBuscar][dato.fiscal_year] = dato;
            this.fundamentalesSubject.next(fund);
            this.empresaFundSubject.next(fund[tickerBuscar])
          })
        });

    }
    else {
      this.empresaFundSubject.next(fund[tickerBuscar]);
    }

    return this.empresaFundSubject;
  }

}