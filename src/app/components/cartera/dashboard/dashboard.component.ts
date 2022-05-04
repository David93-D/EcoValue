import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPosicion } from 'src/app/interfaces/i-posicion';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userLogged = this.authService.getUserLogged();

  itemsTabla = ["Valor", "Ticker", "Precio Medio de Compra", "Nº de Valores", "Total Invertido"]

  listaPosiciones:IPosicion[] = [];

  userName: any;

  constructor(private router: Router, private authService: AuthService, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.userLogged.forEach(p => {
      this.userName = p?.displayName;
    });
    this.mostrarPosiciones();
  }

  mostrarPosiciones() {
    this.firebase.getPosiciones().subscribe((response: any) => {
      const data = Object.entries(response);
      this.listaPosiciones = data.map((e: any) => {
        return e[1];
      })
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

}