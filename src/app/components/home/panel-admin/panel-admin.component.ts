import { Component, OnInit } from '@angular/core';
import { IArticulo } from 'src/app/interfaces/i-articulo';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getStorage, ref, deleteObject } from "firebase/storage";

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  llistaArt: IArticulo[] = [];

  constructor(
    private authService: AuthService, 
    private firebase: FirebaseService
  ) { }

  ngOnInit(): void {
    this.listaArt();
  }

  listaArt() {
    this.firebase.getAllArticulos().subscribe((response) => {
      this.llistaArt = Object.entries(response).map(a => {
        a[1]['id'] = a[0];        
        return a[1];
      });
    })
  }

  borrarArt(id: string, Imagen: string) {
    const storage = getStorage();
    const desertRef = ref(storage, Imagen);

    deleteObject(desertRef).then(() => {

    }).catch((error) => {
      console.log(error);
    });
    this.firebase.delArticulo(id);
  }

  logout() {
    this.authService.logout();
  }

}
