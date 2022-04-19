import { Component, OnInit } from '@angular/core';
import { IInfoValor } from 'src/app/interfaces/i-info-valor';
import { DataValoresService } from 'src/app/services/data-valores.service';

@Component({
  selector: 'app-valores-analisis',
  templateUrl: './valores-analisis.component.html',
  styleUrls: ['./valores-analisis.component.css']
})
export class ValoresAnalisisComponent implements OnInit {

  valores: IInfoValor[] = [];

  valorBuscar = "";

  constructor(private dataValores: DataValoresService) { }

  ngOnInit(): void {
    this.dataValores.valoresSubject.subscribe( r => this.valores = r);
    this.dataValores.getAllStocks();
  }

  botonSiguiente() {
    this.dataValores.getAllStocksPages(1);
  }

  botonAtras() {
    this.dataValores.getAllStocksPages(3);
  }

  buscarValores() {
    console.log("Funciona!!!");
  }

}
