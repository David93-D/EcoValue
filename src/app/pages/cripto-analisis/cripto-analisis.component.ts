import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { filter, fromEvent } from 'rxjs';
import { IInfoCripto } from 'src/app/interfaces/i-info-cripto';
import { DataCriptoService } from 'src/app/services/data-cripto.service';

@Component({
  selector: 'app-cripto-analisis',
  templateUrl: './cripto-analisis.component.html',
  styleUrls: ['./cripto-analisis.component.css']
})
export class CriptoAnalisisComponent implements OnInit {

  conceptos: string[] = ["Ticker", "Cripto - Divisa", "Ver más"];

  criptos: IInfoCripto[] = [];

  @ViewChild('valorBuscar') criptoBuscar!: ElementRef;

  loading = false;

  constructor(private dataCripto: DataCriptoService) { }

  ngOnInit(): void {
    this.loading = true;
    this.dataCripto.criptosSubject.subscribe( r => this.criptos = r);
    this.dataCripto.getAllCryptos();
    this.loading = false;
  }

  ngAfterViewInit() {
    fromEvent(this.criptoBuscar.nativeElement,'keyup')
    .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((text) => {
          console.log(this.criptoBuscar.nativeElement.value)
        })
    )
    .subscribe(() => this.buscarCriptos());
  }

  botonSiguiente() {
    this.dataCripto.getAllCryptosPages(1);
  }

  botonAtras() {
    this.dataCripto.getAllCryptosPages(3);
  }

  buscarCriptos() {
    console.log(this.criptoBuscar.nativeElement.value);
    this.dataCripto.searchCriptos(this.criptoBuscar.nativeElement.value);
  }

}
