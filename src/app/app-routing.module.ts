import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsValorComponent } from './components/analisis-valor/news-valor/news-valor.component';
import { PrecioValorComponent } from './components/analisis-valor/precio-valor/precio-valor.component';
import { HomeComponent } from './pages/home/home.component';
import { ValoresAnalisisComponent } from './pages/valores-analisis/valores-analisis.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'analisis-valor', component: ValoresAnalisisComponent},
  // {path: 'balance', component: BalanceComponent},
  // {path: 'income', component: IncomeComponent},
  // {path: 'cashflow', component: CashFlowComponent},
  {path: 'precio-valor/:ticker/:name/:last_updated_utc', component: PrecioValorComponent},
  // {path: 'fundamental-valor/:ticker/:name', component: FundamentalValorComponent},
  {path: 'news-valor/:ticker/:name', component: NewsValorComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
