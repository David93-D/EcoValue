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
  grapharea: any;

  grafico_cashFlow: any;

  datos_grafico_cashFlow: ICashFlow[] = [];

  flujoNeto: number[] = [];
  flujoActFin: number[] = [];
  flujoInvAct: number[] = [];
  flujoOpAct: number[] = [];

  constructor() { }

  ngOnInit(): void {    
    this.chart = document.getElementById("grafico_cashFlow");
    const ctx = (this.chart as HTMLCanvasElement).getContext('2d');
    Chart.register(...registerables);
    this.grafico_cashFlow = this.loadChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.grafico_cashFlow = this.loadChart();
    this.datos_grafico_cashFlow = changes["cashFlow"]["currentValue"];
    this.anyos = changes["anyos"]["currentValue"];
    this.flujoNeto = this.datos_grafico_cashFlow.map(d => d.net_cash_flow.value);
    this.flujoActFin = this.datos_grafico_cashFlow.map(d => d.net_cash_flow_from_financing_activities.value);
    this.flujoInvAct = this.datos_grafico_cashFlow.map(d => d.net_cash_flow_from_investing_activities.value);
    this.flujoOpAct = this.datos_grafico_cashFlow.map(d => d.net_cash_flow_from_operating_activities.value);
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
            data: this.flujoNeto,
            borderColor: 'red',
            backgroundColor: 'red',
          },
          {
            label: "Flujo de Caja Actividades Financieras",
            data: this.flujoActFin,
            borderColor: 'yellow',
            backgroundColor: 'yellow',
          },
          {
            label: "Flujo de Caja Actividades Inversión",
            data: this.flujoInvAct,
            borderColor: 'blue',
            backgroundColor: 'blue',
          },
          {
            label: "Flujo de Caja Operativo",
            data: this.flujoOpAct,
            borderColor: 'brown',
            backgroundColor: 'brown',
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