import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticulo } from 'src/app/interfaces/i-articulo';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-show-articulo',
  templateUrl: './show-articulo.component.html',
  styleUrls: ['./show-articulo.component.css']
})
export class ShowArticuloComponent implements OnInit {

  articulo?: IArticulo;

  constructor(private router: Router, private route: ActivatedRoute, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      let id = p['id'];
      this.firebase.getArticulo(id).subscribe(a=> this.articulo = a)
    });
  }

  volverHome() {
    this.router.navigate(["home"]);
  }

}