import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IArticulo } from 'src/app/interfaces/i-articulo';
import { FirebaseService } from 'src/app/services/firebase.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-articulo',
  templateUrl: './add-articulo.component.html',
  styleUrls: ['./add-articulo.component.css']
})
export class AddArticuloComponent implements OnInit {

  newArticuloForm = new FormGroup({
    tituloArt: new FormControl(''),
    cuerpoArt: new FormControl(''),
  });

  reader = new FileReader();

  imagen: any;

  llistarArticulos: IArticulo[] = [];

  constructor(private storageService: StorageService, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.mostrarArticulos();
     
  }

  mostrarArticulos() {
    this.firebaseService.getAllArticulos().subscribe((response) => {
      this.llistarArticulos = Object.values(
        response
      );
    });
    
  }

  altaArticulo() {
    this.uploadImg(this.reader);
  }

  cargarImagen(event: any) {
    let archivo = event.target.files;
    
    this.reader.readAsDataURL(archivo[0]);
    this.reader.onloadend = () => {
      this.imagen = this.reader.result;
    }
  
  }

  uploadImg(reader: any) {
    this.storageService.subirImagen("Eco_" + Date.now(), reader.result).then(urlImagen => {

      let nuevoArticulo = {
        Titulo: this.newArticuloForm.value.tituloArt,
        Cuerpo: this.newArticuloForm.value.cuerpoArt,
        Imagen: urlImagen
      }  

      this.firebaseService.addArticulo(nuevoArticulo);
      alert("Nuevo articulo dado de Alta");
    });
  }

}
