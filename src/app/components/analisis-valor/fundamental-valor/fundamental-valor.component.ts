import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBalance } from 'src/app/interfaces/i-balance';
import { ICashFlow } from 'src/app/interfaces/i-cash-flow';
import { IIncome } from 'src/app/interfaces/i-income';
import { FundamentalesValoresService } from 'src/app/services/fundamentales-valores.service';

@Component({
  selector: 'app-fundamental-valor',
  templateUrl: './fundamental-valor.component.html',
  styleUrls: ['./fundamental-valor.component.css']
})
export class FundamentalValorComponent implements OnInit {

  valor_nombre!: string;
  anyo_actual!: number;

  array_anyos: number[] = [];

  items_balance: (IBalance|null)[] = [];

  items_income: (IIncome|null)[] = [];

  items_cashFlow: (ICashFlow|null)[] = [];

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private fundamentalesValores: FundamentalesValoresService
  ) { }

  ngOnInit(): void {
    this.obtenerAnyos();
      this._route.params.subscribe(p => {
        this.valor_nombre = p['name'];
        const ticker = p['ticker'];
        this.fundamentalesValores.getFundamentales(ticker).subscribe(response => {
          this.array_anyos = Object.keys(response).map(k=> parseInt(k));
          this.items_balance = Object.values(response).map(r => r != null ? r.balance_sheet : null)
          this.items_income = Object.values(response).map(n => n != null ? n.income_statement : null); 
          this.items_cashFlow = Object.values(response).map(f => f != null ? f.cash_flow_statement : null);
        })
      });
  }

  obtenerAnyos() {
    this.anyo_actual = new Date().getFullYear()-1;
    this.array_anyos.push(this.anyo_actual);
    for (let index = 1; index <= 3; index++) {
      let anyo_s = this.anyo_actual-index;
      this.array_anyos.push(anyo_s);
    }
    this.array_anyos.reverse();
  }

  volver() {
    this._router.navigate(['/analisis-valor']);
  }

}
