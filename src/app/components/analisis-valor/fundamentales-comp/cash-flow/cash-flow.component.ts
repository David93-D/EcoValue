import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ICashFlow } from 'src/app/interfaces/i-cash-flow';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  @Input() cashFlow!: (ICashFlow|null)[];
  @Input() anyos!: number[];

  chart: any;

  grafico_cashFlow: any;

  datos_grafico_cashFlow: number[] = [];

  constructor() { }

  ngOnInit(): void {    
    this.chart = document.getElementById("grafico_cashFlow");
    Chart.register(...registerables);
    this.grafico_cashFlow = this.loadChart();
    this.grafico_cashFlow.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.datos_grafico_cashFlow = changes["cashFlow"]["currentValue"];
    console.log(this.datos_grafico_cashFlow);
    this.anyos = changes["anyos"]["currentValue"];
    console.log(this.anyos);
    
    this.grafico_cashFlow.update();
  }

  loadChart(): any {
    return new Chart(this.chart, {
      type: "line",
      data: {
        labels: this.anyos,
        datasets: [
          {
            label: "Flujo de Caja Neto",
            data: [20, 30, 40, 50],
            borderColor: 'red',
            backgroundColor: 'white',
          },
          {
            label: "Flujo de Caja Actividades Financieras",
            data: [50, 60, 70, 80],
            borderColor: 'yellow',
            backgroundColor: 'grey',
          },
          {
            label: "Flujo de Caja Actividades Inversión",
            data: [500, 600, 700, 800],
            borderColor: 'blue',
            backgroundColor: 'pink',
          },
          {
            label: "Flujo de Caja Operativo",
            data: [1000, 2000, 3000, 4000],
            borderColor: 'brown',
            backgroundColor: 'black',
          }
        ],
      }
    })
  }

  obtenerDatosTabla() {

  }

}