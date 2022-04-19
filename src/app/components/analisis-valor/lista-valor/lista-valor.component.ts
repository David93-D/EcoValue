import { Component, Input, OnInit } from '@angular/core';
import { IInfoValor } from 'src/app/interfaces/i-info-valor';

@Component({
  selector: 'tr[app-lista-valor]',
  templateUrl: './lista-valor.component.html',
  styleUrls: ['./lista-valor.component.css']
})
export class ListaValorComponent implements OnInit {

  @Input() valor!: IInfoValor;

  constructor() { }

  ngOnInit(): void {
  }

}
