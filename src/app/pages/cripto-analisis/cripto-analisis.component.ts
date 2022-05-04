import { Component, OnInit } from '@angular/core';
import { ICripto } from 'src/app/interfaces/i-cripto';
import { DataCriptoService } from 'src/app/services/data-cripto.service';

@Component({
  selector: 'app-cripto-analisis',
  templateUrl: './cripto-analisis.component.html',
  styleUrls: ['./cripto-analisis.component.css']
})
export class CriptoAnalisisComponent implements OnInit {

  cryptoElegida: ICripto | undefined;

  crypto_Imagen: String = "";

  mostrarImg = false;

  datosCrypto: ICripto | undefined;
  filterCrypto!: "";
  arrayCryptos: ICripto[] = [];

  constructor(private dataCripto: DataCriptoService) { }

  ngOnInit(): void {
    //this.obtenerCrypto();

    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    hoy.toISOString();

    console.log(hoy.toISOString());
    

    this.obtenerTodasCryptos();
  }

  // obtenerCrypto() {
  //   this.dataCripto.getCrypto().subscribe( response => {
  //     this.datosCrypto = response;
  //   });
  // }

  obtenerTodasCryptos() {
    this.dataCripto.getAllCryptos().subscribe( response => {
      this.arrayCryptos = response;
    });
  }


  // const limite = fecha.indexOf('T');
  // const ultima_fecha = fecha.substring(0, limite);
  // return ultima_fecha;


}
