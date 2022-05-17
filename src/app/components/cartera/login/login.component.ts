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
    const {email,password} = this.usuario;
    this.authService.login(email, password);

    // console.log(this.usuario);
    // const {email,password} = this.usuario;
    // this.authService.login(email,password).then(res => {
    //   //localStorage.setItem("token", res!.user!.refreshToken);
    //   //localStorage.setItem("uid", res!.user!.uid);
    //   //console.log("se loggeó: " + res?.user?.uid);
    //   //this.router.navigate(["dashboard"]);
    // })
  }

  loginConGoogle() {
    this.authService.loginWithGoogle();

    // this.authService.loginWithGoogle(email,password).then(res => {

    //   //console.log(res!.credential!.idToken);

    //   console.log(res);

    //   localStorage.setItem("token", res!.user!.refreshToken);
    //   localStorage.setItem("uid", res!.user!.uid);
    //   console.log("se loggeó con google: " + res?.user?.uid);
    //   this.router.navigate(["dashboard"]);
    // })
  }

  logout() {
    this.authService.logout();
  }

  irRegistro() {
    this.router.navigate(["registro"]);
  }

}