import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPosicion } from 'src/app/interfaces/i-posicion';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogOperacionesComponent } from '../dialog-operaciones/dialog-operaciones.component';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  itemsTablaPos = ["Valor", "Ticker", "Precio Medio de Compra", "Nº de Valores", "Total Invertido"];
  itemsTablaRent = ["Valor", "Ticker", "% Beneficio/Pérdida"];

  //userLogged = this.authService.getUserLogged();

  userName: any;
  userEmail: any;

  listaPosiciones:IPosicion[] = [];

  totalInvertidoCartera: number = 0;

  datos_grafico_cartera: number[] = [];

  chart: any;

  grafico_cartera: any;

  apartado = true;

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private firebase: FirebaseService, 
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.chart = document.getElementById("grafico_cartera");
    Chart.register(...registerables);
    this.grafico_cartera = this.loadChart();
    this.grafico_cartera.update();

    this.mostrarPosiciones();    
  }

  mostrarPosiciones() {
    this.firebase.getPosiciones().subscribe((response: any) => {
      const data = Object.entries(response);
      this.listaPosiciones = data.map((e: any) => {
        console.log(e);
        this.totalInvertidoCartera += e[1].Total;
        return e[1];
      })
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
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
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