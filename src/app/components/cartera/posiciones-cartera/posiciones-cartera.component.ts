import { Component, Input, OnInit } from '@angular/core';
import { IPosicion } from 'src/app/interfaces/i-posicion';

@Component({
  selector: 'tr[app-posiciones-cartera]',
  templateUrl: './posiciones-cartera.component.html',
  styleUrls: ['./posiciones-cartera.component.css']
})
export class PosicionesCarteraComponent implements OnInit {
  
  @Input() posicion: IPosicion | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
