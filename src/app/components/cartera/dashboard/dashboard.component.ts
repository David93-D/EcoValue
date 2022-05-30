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
import { deleteUser, getAuth } from '@firebase/auth';

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

  benefDTotal: number = 0;

  datos_grafico_cartera: number[] = [];

  listaRent: IRentPos[] = [];

  labelsGrafico: string[] = [];

  chart: any;

  grafico_cartera: any;

  apartado = true;

  constructor(
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
      this.listaPosiciones = data.map((e: any) => e[1]);
      this.datos_grafico_cartera =  data.map((e: any) => e[1].Total );
      this.grafico_cartera.data.datasets[0].data =  this.datos_grafico_cartera;
      this.labelsGrafico = data.map((e: any) => e[0] );
      this.grafico_cartera.data.labels = this.labelsGrafico;
      this.totalInvertidoCartera = data.reduce((acumulado: number,actual: any)=> acumulado + actual[1].Total,0);
      this.getPreciosActuales();
      this.grafico_cartera.update();
    });
  }

  getPreciosActuales() {
    this.dataValores.preciosActualizados().subscribe( response => {
      console.log(response);
      
      this.listaRent = this.listaPosiciones.map(p => {
        let valorBuscado = response.filter((v: any) => v.T == p.ticker);
        let benfD = ((p.cantidad * valorBuscado[0].c) - p.Total);
        let benefP = (((p.cantidad * valorBuscado[0].c) - p.Total) / p.Total) * 100;
        this.benefDTotal += benfD;
        
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
    
  eliminarCuenta() {
    let opcion = confirm("¿Esta seguro de querer eliminar su cuenta?");
    if (opcion == true) {
      const auth = getAuth();
      const user = auth.currentUser;
      
      deleteUser(user!).then(() => {
        console.log("Usuario eliminado");
      }).catch((error) => {
        console.log(error);
      });
  
      alert("Su cuenta ha sido eliminada correctamente.");
      this.logout();
	  }
  }

  logout() {
    this.authService.logout();
  }
  
}