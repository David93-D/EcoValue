import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IIncome } from 'src/app/interfaces/i-income';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  @Input() income!: (IIncome|null)[];
  @Input() anyos!: number[];

  chart: any;

  datos_grafico_income: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.chart = document.getElementById("grafico_income");
    Chart.register(...registerables);
    let grafico_income = this.loadChart();
    grafico_income.update();
  }

  loadChart(): any {
    return new Chart(this.chart, {
      type: "line",
      data: {
        labels: this.anyos,
        datasets: [
          {
            label: "Ingresos Brutos",
            data: [20, 30, 40, 50],
            borderColor: 'red',
            backgroundColor: 'white',
          },
          {
            label: "B/P antes de Impuestos",
            data: [50, 60, 70, 80],
            borderColor: 'yellow',
            backgroundColor: 'grey',
          },
          {
            label: "B/P despues de Impuestos",
            data: [500, 600, 700, 800],
            borderColor: 'blue',
            backgroundColor: 'pink',
          }
        ],
        
      }
    })
  }

}
