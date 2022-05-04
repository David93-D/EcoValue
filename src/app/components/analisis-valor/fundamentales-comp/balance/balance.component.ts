import { Component, Input, OnInit } from '@angular/core';
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
  datos_grafico_ratiosBalance: number[] = [];

  constructor() { }

  ngOnInit(): void { 
    this.obtenerDatosTabla();
    this.chart = document.getElementById("grafico_balance");
    Chart.register(...registerables);
    let grafico_balance = this.loadChart();
    grafico_balance.update();
  }

  loadChart(): any {
    return new Chart(this.chart, {
      type: "bar",
      data: {
        datasets: [{
          data: this.datos_grafico_ratiosBalance,
          label: "Precio de cierre",
          backgroundColor: '#007bff',
          borderColor: 'yellow'
        }],
        labels: this.anyos
      }
    })
  }

  obtenerDatosTabla() {
    for(let b of this.balance) {
      console.log("DATOS: " + b);
      
    }
  }

}
