import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    email: '',
    password: '',
  }

  constructor(
    private router: Router, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.usuario);
    const {email,password} = this.usuario;
    this.authService.login(email,password).then(res => {
      localStorage.setItem("token", res!.user!.uid);
      console.log("se loggeó: " + res?.user?.uid);
      this.router.navigate(["dashboard"]);
    })
  }

  loginConGoogle() {
    console.log(this.usuario);
    const {email,password} = this.usuario;
    this.authService.loginWithGoogle(email,password).then(res => {
      localStorage.setItem("token", res!.user!.uid);
      console.log("se loggeó con google: " + res?.user?.uid);
      this.router.navigate(["dashboard"]);
    })
  }

  logout() {
    this.authService.logout();
  }

  irRegistro() {
    this.router.navigate(["registro"]);
  }

}