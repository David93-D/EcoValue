import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICripto } from 'src/app/interfaces/i-cripto';

@Component({
  selector: 'tr[app-lista-cripto]',
  templateUrl: './lista-cripto.component.html',
  styleUrls: ['./lista-cripto.component.css']
})
export class ListaCriptoComponent implements OnInit {

  @Input() cripto!: ICripto;
  @Output() positionMarcar = new EventEmitter<ICripto>();

  constructor() { }

  ngOnInit(): void {
  }

  marcarPosicion(crypto: ICripto) {
    this.positionMarcar.emit(crypto);
  }

}
