import { Component, Input, OnInit } from '@angular/core';
import { IBalance } from 'src/app/interfaces/i-balance';
import { IIncome } from 'src/app/interfaces/i-income';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  @Input() balance!: IBalance[]; 
  @Input() income!: IIncome[];
  @Input() anyos!: number[];

  constructor() { }

  ngOnInit(): void {
    
  }

}
