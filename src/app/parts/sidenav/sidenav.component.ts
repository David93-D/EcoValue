import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  fillerNav = [
    {name:"Home", route:"home", icon:"home"},
    {name:"Análisis de Valores", route:"analisis-valor", icon:"analytics"},
    {name:"Análisis Cripto", route:"cripto-analisis", icon:"currency_bitcoin"},
    {name:"Cartera", route:"cartera", icon:"account_balance"},
    {name:"Recursos", route:"resources", icon:"book"},
    {name:"Sobre EcoValue", route:"about", icon:"contact_mail"}
  ]

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;

  ngOnInit(): void {
  }

}
