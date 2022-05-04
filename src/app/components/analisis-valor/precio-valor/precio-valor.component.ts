import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { DataValoresService } from 'src/app/services/data-valores.service';

@Component({
  selector: 'app-precio-valor',
  templateUrl: './precio-valor.component.html',
  styleUrls: ['./precio-valor.component.css']
})
export class PrecioValorComponent implements OnInit {

  chart: any;

  anyo_actual = new Date().getFullYear();

  array_meses: string[] = [];

  datos_grafico_precioCierre: number[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private dataValores: DataValoresService
  ) { }

  ngOnInit(): void {
    this.chart = document.getElementById("grafico_precios");
    Chart.register(...registerables);
    let grafico_precio = this.loadChart();
    this.obtenerMeses();
    this._route.params.subscribe(p => {
      const ultima_fecha = this.getUltimaFecha(p['last_updated_utc']);
      const inicio_fecha = this.getInicioFecha(ultima_fecha);
      let ticker = p['ticker'];
      this.dataValores.getDatosPrecio(ticker,inicio_fecha, ultima_fecha).subscribe(response => {
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
          label: "Precio de cierre",
          backgroundColor: '#007bff',
          borderColor: 'yellow'
        }],
        labels: this.array_meses
      }
    })
  }

  getInicioFecha(ini_fecha: string) {
    const mes_dia = ini_fecha.substring(4)
    const inicio_fecha = (this.anyo_actual-2) + mes_dia;
    return inicio_fecha;
  }

  getUltimaFecha(fecha: string) {
    const limite = fecha.indexOf('T');
    const ultima_fecha = fecha.substring(0, limite);
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
    this._router.navigate(['/analisis-valor']);
  }

}
