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

  items_balance: IBalance[] = [];

  items_income: IIncome[] = [];

  items_cashFlow: ICashFlow[] = [];

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private fundamentalesValores: FundamentalesValoresService
  ) { }

  ngOnInit(): void {
    this.obtenerAnyos();
    console.log(this.array_anyos);
    this.array_anyos.forEach(anyo => {
      
    
      this._route.params.subscribe(p => {
        this.valor_nombre = p['name'];
        const ticker = p['ticker'];
        this.fundamentalesValores.getFundamentales(ticker, anyo).subscribe(response => {

          console.log(response);

          this.items_balance.push(response.balance_sheet);        

          this.items_income.push(response.income_statement); 

          this.items_cashFlow.push(response.cash_flow_statement);

        })
      });


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
