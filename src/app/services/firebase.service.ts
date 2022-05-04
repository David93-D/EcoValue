import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Subject } from 'rxjs';
import { IPosicion } from '../interfaces/i-posicion';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  urlFireDB = `https://proyectoangular-1d854-default-rtdb.firebaseio.com/clientes`;

  posicionesSubject = new Subject<IPosicion[]>();

  //articulosSubject = new Subject<IArticulo[]>();// OBSERVABLE CON SUBJECT

  //CONFIGURACIÓN DE FIREBASE
  // firebaseConfig = {
  //   apiKey: environment.firebaseConfig.apiKey,
  //   authDomain: environment.firebaseConfig.authDomain,
  //   databaseUrl: environment.firebaseConfig.url,
  // };

  //app = initializeApp(this.firebaseConfig);

  constructor(private http: HttpClient) { }
  
  getPosiciones() {
    console.log("token: " + localStorage.getItem("token"));
    
    console.log(this.urlFireDB + `/${localStorage.getItem("token")}.json`);
    

    this.http.get<IPosicion[]>(this.urlFireDB + `/${localStorage.getItem("token")}.json`)
    .subscribe(posiciones => this.posicionesSubject.next(posiciones));

    return this.posicionesSubject;
  }

}