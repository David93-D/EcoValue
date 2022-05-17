import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IBalance } from 'src/app/interfaces/i-balance';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  @Input() balance!: (IBalance|null)[]; 
  @Input() anyos!: number[];

  chart: any;

  grafico_balance: any;

  datos_grafico_Balance: IBalance[] = [];

  actTot: number[] = [];
  pasTot: number[] = [];
  actNcorr: number[] = [];
  pasNcorr: number[] = [];
  actCorr: number[] = [];
  pasCorr: number[] = [];
  patrim: number[] = [];

  constructor() { }

  ngOnInit(): void { 
    this.chart = document.getElementById("grafico_balance");
    Chart.register(...registerables);
    this.grafico_balance = this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.datos_grafico_Balance = changes["balance"]["currentValue"];
    this.anyos = changes["anyos"]["currentValue"];
    this.actTot = this.datos_grafico_Balance.map(d => d.assets.value);
    this.pasTot = this.datos_grafico_Balance.map(d => d.liabilities.value);
    this.actNcorr = this.datos_grafico_Balance.map(d => d.noncurrent_assets.value);
    this.pasNcorr = this.datos_grafico_Balance.map(d => d.noncurrent_liabilities.value);
    this.actCorr = this.datos_grafico_Balance.map(d => d.current_assets.value);
    this.pasCorr = this.datos_grafico_Balance.map(d => d.current_liabilities.value);
    this.patrim = this.datos_grafico_Balance.map(d => d.equity.value);
    this.grafico_balance.update();
  }

  loadChart(): any {
    return new Chart(this.chart, {
      type: "bar",
      data: {
        labels: this.anyos,
        datasets: [
          {
            label: "Activo Total",
            data: this.actTot,
            backgroundColor: 'yellow',
            borderColor: 'yellow'
          },
          {
            label: "Pasivo Total",
            data: this.pasTot,
            backgroundColor: 'red',
            borderColor: 'red'
          },
          {
            label: "Act. No Corriente",
            data: this.actNcorr,
            backgroundColor: 'blue',
            borderColor: 'blue'
          },
          {
            label: "Pasivo No Corriente",
            data: this.pasNcorr,
            backgroundColor: 'orange',
            borderColor: 'orange'
          },
          {
            label: "Act. Corriente",
            data: this.actCorr,
            backgroundColor: 'pink',
            borderColor: 'pink'
          },
          {
            label: "Pasivo Corriente",
            data: this.pasCorr,
            backgroundColor: 'green',
            borderColor: 'green'
          },
          {
            label: "Patrimonio Neto",
            data: this.patrim,
            backgroundColor: 'grey',
            borderColor: 'grey'
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: { color: 'white' }
          },
          x: {
            ticks: { color: 'white' }
          }
        },
        plugins: {
          legend: {
              display: true,
              labels: {
                  color: '#b4975a',
                  font: { size: 14}
              }
          }
      }
      }
    })
  }


}
