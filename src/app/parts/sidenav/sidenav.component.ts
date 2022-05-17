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
    {name:"Cartera", route:"cartera", icon:"account_balance"},
    {name:"Análisis Cripto", route:"cripto-analisis", icon:"currency_bitcoin"},
    {name:"Recursos", route:"recursos", icon:"book"},
    {name:"Contacto", route:"contacto", icon:"contact_mail"}
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
