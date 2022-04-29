import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario = {
    email: '',
    password: ''
  }

  formularioAlta: FormGroup;

  constructor(public fb: FormBuilder, private authService: AuthService) {
    this.formularioAlta = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.required, Validators.minLength(5)]),
    })
  }

  ngOnInit(): void {
  }

  registrarse() {
    console.log(this.usuario);
    const {email,password} = this.usuario;
    this.authService.register(email,password).then(res => {
      console.log("se registró: " + res);
    })
  }

}
