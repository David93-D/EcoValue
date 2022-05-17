import { Component, Input, OnInit } from '@angular/core';
import { IRentPos } from 'src/app/interfaces/i-rent-pos';

@Component({
  selector: 'tr[app-rentabilidades-cartera]',
  templateUrl: './rentabilidades-cartera.component.html',
  styleUrls: ['./rentabilidades-cartera.component.css']
})
export class RentabilidadesCarteraComponent implements OnInit {

  @Input() rentPos: IRentPos | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
