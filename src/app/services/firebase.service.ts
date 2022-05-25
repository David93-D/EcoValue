import { Injectable } from '@angular/core';
import { mergeMap, Subject } from 'rxjs';
import { IPosicion } from '../interfaces/i-posicion';
import { HttpClient } from '@angular/common/http';
import { IArticulo } from '../interfaces/i-articulo';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  urlFireDB = `https://proyectoangular-1d854-default-rtdb.firebaseio.com/clientes/`;

  posicionesSubject = new Subject<IPosicion[]>();

  articulosSubject = new Subject<IArticulo[]>();

  constructor(private http: HttpClient) { }
  
  getPosiciones() {
    this.http.get<IPosicion[]>(this.urlFireDB + `${localStorage.getItem("uid")}.json?auth=` + localStorage.getItem("token"))
    .subscribe(posiciones => this.posicionesSubject.next(posiciones));
    return this.posicionesSubject;
  }

  getPosicionesCartera() {
    return this.http.get<IPosicion[]>(this.urlFireDB + `${localStorage.getItem("uid")}.json?auth=` + localStorage.getItem("token"));
  }

  comprarPosicion(valorSeleccionado: any , operacionCompra: any) {    
    this.http.put(this.urlFireDB + `${localStorage.getItem("uid")}/${valorSeleccionado}.json?auth=` + localStorage.getItem("token"), JSON.stringify(operacionCompra))
    .pipe(mergeMap(() => this.getPosiciones())).subscribe(() => {});
  }

  getPosicionParticular(valorSeleccionado: any) {
    return this.http.get(this.urlFireDB + `${localStorage.getItem("uid")}/${valorSeleccionado}.json?auth=` + localStorage.getItem("token"));
  }

  ventaPosicion(posicionVender: string) {
    return this.http.delete(this.urlFireDB + `/${localStorage.getItem("uid")}/${posicionVender}.json?auth=` + localStorage.getItem("token"))
    .pipe(mergeMap(() => this.getPosiciones())).subscribe(() => {});
  }

  getAllArticulos() {
    const url = `https://proyectoangular-1d854-default-rtdb.firebaseio.com/articulos`;
    this.http.get<IArticulo[]>(url + `.json`).subscribe(articulos => {
      this.articulosSubject.next(articulos)
    });
    return this.articulosSubject;
  }

  getArticulo(id:number) {
    const url = `https://proyectoangular-1d854-default-rtdb.firebaseio.com/articulos`;
    return this.http.get<IArticulo>(`${url}/${id}.json`);
  }

  addArticulo(articuloCreado: any) {
    const url = `https://proyectoangular-1d854-default-rtdb.firebaseio.com/articulos`;
    this.http.post(url + `.json?auth=` + localStorage.getItem("token"), JSON.stringify(articuloCreado))
    .pipe(mergeMap(() => this.getAllArticulos())).subscribe(() => {});
  }

  delArticulo(id: string) {
    const url = `https://proyectoangular-1d854-default-rtdb.firebaseio.com/articulos`;
    return this.http.delete(url + `/${id}` + `.json?auth=` + localStorage.getItem("token"))
    .pipe(mergeMap(() => this.getAllArticulos())).subscribe(() => {});
  }

}