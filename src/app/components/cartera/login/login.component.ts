import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  frasesInversion = [
    '"No es necesario hacer cosas extraordinarias para conseguir resultados extraordinarios" - Warren Buffet',
    '"Si no estás dispuesto a poseer una acción durante diez años, ni siquiera pienses en poseerla diez minutos" - Warren Buffet',
    '"Sea temeroso cuando los demás sean codiciosos y sea codicioso cuando los demas sean temerosos - Warren Buffett',
    '"Nunca inviertas en una idea que no puedas ilustrar con un lápiz" - Peter Lynch',
    '"La gente no tiene paciencia para enriquecerse lentamente, por eso decide arruinarse rápidamente - Peter Lynch'
  ];

  fraseMostrar: string = "";


  usuario = {
    email: '',
    password: '',
  }

  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.alternarFrase();
  }

  login() {
    const {email,password} = this.usuario;
    this.authService.login(email, password);
  }

  loginConGoogle() {
    this.authService.loginWithGoogle();
  }

  logout() {
    this.authService.logout();
  }

  irRegistro() {
    this.router.navigate(["registro"]);
  }

  alternarFrase() {
    let indice = Math.floor(Math.random() * this.frasesInversion.length);
    if (indice == this.frasesInversion.length) indice = 0;
    this.fraseMostrar = this.frasesInversion[indice];
    setTimeout(() => {
      this.alternarFrase();
    }, 5000);
  }

}