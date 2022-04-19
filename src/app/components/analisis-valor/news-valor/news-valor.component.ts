import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { INewsValor } from 'src/app/interfaces/i-news-valor';
import { DataValoresService } from 'src/app/services/data-valores.service';

@Component({
  selector: 'app-news-valor',
  templateUrl: './news-valor.component.html',
  styleUrls: ['./news-valor.component.css']
})
export class NewsValorComponent implements OnInit {

  valor_nombre!: string;

  news_valores: INewsValor[] = [];

  constructor(
    private _route: ActivatedRoute, 
    private _router: Router,
    private dataValores: DataValoresService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(p => {
      this.valor_nombre = p['name'];
      let ticker = p['ticker'];
      this.dataValores.getNewsStocks(ticker).subscribe(response => {
        this.news_valores = response;
        console.log(this.news_valores);
      });
    });
  }

  volver() {
    this._router.navigate(['/analisis-valor']);
  }

}