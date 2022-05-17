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

  constructor(private firebase:FirebaseService) { }

  ngOnInit(): void {
    this.mostrarArticulos();
  }

  mostrarArticulos() {
    this.firebase.getAllArticulos().subscribe((response) => {
      this.llistarArticulos = response;
    })
  }

}
