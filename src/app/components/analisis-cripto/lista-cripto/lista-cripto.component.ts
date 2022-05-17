import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICripto } from 'src/app/interfaces/i-cripto';
import { IInfoCripto } from 'src/app/interfaces/i-info-cripto';

@Component({
  selector: 'tr[app-lista-cripto]',
  templateUrl: './lista-cripto.component.html',
  styleUrls: ['./lista-cripto.component.css']
})
export class ListaCriptoComponent implements OnInit {

  @Input() cripto!: IInfoCripto;
  @Output() positionMarcar = new EventEmitter<ICripto>();

  constructor() { }

  ngOnInit(): void {
  }

}
