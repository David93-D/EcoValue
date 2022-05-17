import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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

  grafico_income: any;

  datos_grafico_income: IIncome[] = [];

  ingresosBrutos: number[] = [];
  bpAntesImp: number[] = [];
  bpDespImp: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.chart = document.getElementById("grafico_income");
    Chart.register(...registerables);
    this.grafico_income = this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.datos_grafico_income = changes["income"]["currentValue"];
    this.anyos = changes["anyos"]["currentValue"];
    this.ingresosBrutos = this.datos_grafico_income.map(d => d.revenues.value);
    this.bpAntesImp = this.datos_grafico_income.map(d => d.income_loss_from_continuing_operations_before_tax.value);
    this.bpDespImp = this.datos_grafico_income.map(d => d.income_loss_from_continuing_operations_after_tax.value);
    this.grafico_income.update();
  }

  loadChart(): any {
    return new Chart(this.chart, {
      type: "line",
      data: {
        labels: this.anyos,
        datasets: [
          {
            label: "Ingresos Brutos",
            data: this.ingresosBrutos,
            borderColor: 'red',
            backgroundColor: 'red',
          },
          {
            label: "B/P antes de Impuestos",
            data: this.bpAntesImp,
            borderColor: 'yellow',
            backgroundColor: 'yellow',
          },
          {
            label: "B/P despues de Impuestos",
            data: this.bpDespImp,
            borderColor: 'blue',
            backgroundColor: 'blue',
          }
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
