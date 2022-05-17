import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { DataCriptoService } from 'src/app/services/data-cripto.service';

@Component({
  selector: 'app-precio-cripto',
  templateUrl: './precio-cripto.component.html',
  styleUrls: ['./precio-cripto.component.css']
})
export class PrecioCriptoComponent implements OnInit {

  valor_nombre!: string;

  chart: any;

  anyo_actual = new Date().getFullYear();

  array_meses: string[] = [];

  datos_grafico_precioCierre: number[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private dataCriptos: DataCriptoService
  ) { }

  ngOnInit(): void {
    this.chart = document.getElementById("grafico_precios");
    Chart.register(...registerables);
    let grafico_precio = this.loadChart();
    this.obtenerMeses();
    this._route.params.subscribe(p => {
      this.valor_nombre = p['name'];
      const ultima_fecha = this.getUltimaFecha();
      const inicio_fecha = this.getInicioFecha(ultima_fecha);
      let ticker = p['ticker'];
      this.dataCriptos.getDatosPrecio(ticker,inicio_fecha, ultima_fecha).subscribe(response => {
        response.map((p: any) => {
          this.datos_grafico_precioCierre.push(p.c);
        })
        grafico_precio.update();
      });
    });
  }

  loadChart(): any {
    return new Chart(this.chart, {
      type: "line",
      data: {
        datasets: [{
          data: this.datos_grafico_precioCierre,
          label: "Precio a cierre de mes",
          backgroundColor: '#007bff',
          borderColor: 'yellow'
        }],
        labels: this.array_meses
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: { color: '#fff' }
          },
          x: {
            ticks: { color: 'white' }
          }
        }
      }
    })
  }

  getInicioFecha(ini_fecha: string) {
    const mes_dia = ini_fecha.substring(4);
    const inicio_fecha = (this.anyo_actual-2) + mes_dia;
    return inicio_fecha;
  }

  getUltimaFecha() {
    const fecha_actual = new Date();
    let mes_actual = fecha_actual.getMonth()+1;
    let mes = mes_actual.toString();

    if (mes_actual <= 9) mes = "0" + mes_actual;
    
    const ultima_fecha = this.anyo_actual + "-" + mes + "-01";
    return ultima_fecha;
  }

  obtenerMeses() {
    const fecha_actual = new Date();
    let mes_actual = fecha_actual.getMonth()+1;
    let anyo_lista = this.anyo_actual;
    for(let index = 12; index >= 1; index--) {
      if (mes_actual == 0) {
        anyo_lista--;
        mes_actual = 12;
      }
      let addFecha = anyo_lista + "-" + mes_actual;
      this.array_meses.push(addFecha);
      mes_actual--;
    }
    this.array_meses.reverse();    
  }

  volver() {
    this._router.navigate(['/cripto-analisis']);
  }

}
