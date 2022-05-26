import { Component, OnInit } from '@angular/core';
import { IArticulo } from 'src/app/interfaces/i-articulo';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  llistarArticulos: IArticulo[] = [];

  pagina = 0;

  atEnd = false;

  constructor(private firebase:FirebaseService) { }

  ngOnInit(): void {
    this.firebase.atEnd.subscribe(a => this.atEnd = a);
    this.mostrarArticulos();
  }

  mostrarArticulos() {
    this.firebase.getOrdenArticulos(0).subscribe((response) => {
      this.llistarArticulos = Object.entries(response).map(a => {
        a[1]['id'] = a[0];        
        return a[1];
      });
    })
  }

  botonAtras() {
    if (this.pagina >= 8) {
      this.pagina -= 8;
      this.firebase.getOrdenArticulos(this.pagina);
    }
  }

  botonSiguiente() {
    this.pagina += 8;
    this.firebase.getOrdenArticulos(this.pagina);
  }

}