import { Component, Input, OnInit } from '@angular/core';
import { IIncome } from 'src/app/interfaces/i-income';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  @Input() income!: IIncome[];
  @Input() anyos!: number[];

  constructor() { }

  ngOnInit(): void {
  }

}
