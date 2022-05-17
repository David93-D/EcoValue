import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { filter, fromEvent } from 'rxjs';
import { IInfoValor } from 'src/app/interfaces/i-info-valor';
import { DataValoresService } from 'src/app/services/data-valores.service';

@Component({
  selector: 'app-valores-analisis',
  templateUrl: './valores-analisis.component.html',
  styleUrls: ['./valores-analisis.component.css']
})
export class ValoresAnalisisComponent implements OnInit, AfterViewInit {

  conceptos: string[] = ["Ticker", "Empresa", "Ver"];

  valores: IInfoValor[] = [];

  @ViewChild('valorBuscar') valorBuscar!: ElementRef;

  loading = false;

  constructor(private dataValores: DataValoresService) { }

  ngOnInit(): void {
    this.loading = true;
    this.dataValores.valoresSubject.subscribe( r => this.valores = r);
    this.dataValores.getAllStocks();
    this.loading = false;
  }

  ngAfterViewInit() {
    fromEvent(this.valorBuscar.nativeElement,'keyup')
    .pipe(
        filter(Boolean),
        debounceTime(1000),
        distinctUntilChanged(),
        tap((text) => {
          console.log(this.valorBuscar.nativeElement.value)
        })
    )
    .subscribe(() => this.buscarValores());
  }

  botonSiguiente() {
    this.dataValores.getAllStocksPages(1);
  }

  botonAtras() {
    this.dataValores.getAllStocksPages(3);
  }

  buscarValores() {
    this.dataValores.searchStocks(this.valorBuscar.nativeElement.value);
  }

}