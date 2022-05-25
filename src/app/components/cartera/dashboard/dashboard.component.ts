import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPosicion } from 'src/app/interfaces/i-posicion';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogOperacionesComponent } from '../dialog-operaciones/dialog-operaciones.component';
import { Chart, registerables } from 'chart.js';
import { DataValoresService } from 'src/app/services/data-valores.service';
import { IRentPos } from 'src/app/interfaces/i-rent-pos';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemsTablaPos = ["Valor", "Ticker", "Precio Medio de Compra", "Nº de Valores", "Total Invertido"];
  itemsTablaRent = ["Valor", "$ Beneficio/Pérdida", "% Beneficio/Pérdida"];

  userName: any;
  userEmail = localStorage.getItem('email');

  listaPosiciones: IPosicion[] = [];

  totalInvertidoCartera: number = 0;

  datos_grafico_cartera: number[] = [];

  listaRent: IRentPos[] = [];

  labelsGrafico: string[] = [];

  chart: any;

  grafico_cartera: any;

  apartado = true;

  constructor(
    private router: Router, 
    private dataValores: DataValoresService,
    private authService: AuthService, 
    private firebase: FirebaseService, 
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.chart = document.getElementById("grafico_cartera");
    Chart.register(...registerables);
    this.grafico_cartera = this.loadChart();
    this.mostrarPosiciones();    
  }

  mostrarPosiciones() {
    this.firebase.getPosiciones().subscribe((response: any) => {
      const data = Object.entries(response);
      this.listaPosiciones = data.map((e: any) => {
        this.datos_grafico_cartera.push(e[1].Total);
        this.labelsGrafico.push(e[0]);
        this.totalInvertidoCartera += e[1].Total;
        return e[1];
      });
      this.getPreciosActuales();
      this.grafico_cartera.update();
    });
  }

  getPreciosActuales() {
    this.dataValores.preciosActualizados().subscribe( response => {
      this.listaRent = this.listaPosiciones.map(p => {
        let valorBuscado = response.filter((v: any) => v.T == p.ticker);
        let benfD = ((p.cantidad * valorBuscado[0].c) - p.Total);
        let benefP = (((p.cantidad * valorBuscado[0].c) - p.Total) / p.Total) * 100;
        let obj = {
          nombre: p.nombre,
          beneficioDinero: benfD,
          beneficioPorcent: benefP
        }
        return obj;
      });
    });
  }

  openDialogValores() {
    const dialogRef = this.dialog.open(DialogOperacionesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  cambioSeccion() {
    if (this.apartado) this.apartado = false;
    else this.apartado = true;
  }

  loadChart(): any {
    return new Chart(this.chart, {
      type: 'doughnut',
      data: {
        labels: this.labelsGrafico,
        datasets: [{
          label: 'My First Dataset',
          data: this.datos_grafico_cartera,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(152, 158, 37)',
            'rgb(37, 158, 46)',
            'rgb(37, 108, 158)',
            'rgb(125, 37, 158)'
          ],
          hoverOffset: 4
        }]
      }
    })
  }
    

  logout() {
    this.authService.logout();
  }
  
}