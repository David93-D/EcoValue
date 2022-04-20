import { Component, Input, OnInit } from '@angular/core';
import { ICashFlow } from 'src/app/interfaces/i-cash-flow';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  @Input() cashFlow!: ICashFlow[];
  @Input() anyos!: number[];

  constructor() { }

  ngOnInit(): void {
  }

}
