import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrecioCriptoComponent } from './components/analisis-cripto/precio-cripto/precio-cripto.component';
import { FundamentalValorComponent } from './components/analisis-valor/fundamental-valor/fundamental-valor.component';
import { BalanceComponent } from './components/analisis-valor/fundamentales-comp/balance/balance.component';
import { CashFlowComponent } from './components/analisis-valor/fundamentales-comp/cash-flow/cash-flow.component';
import { IncomeComponent } from './components/analisis-valor/fundamentales-comp/income/income.component';
import { NewsValorComponent } from './components/analisis-valor/news-valor/news-valor.component';
import { PrecioValorComponent } from './components/analisis-valor/precio-valor/precio-valor.component';
import { DashboardComponent } from './components/cartera/dashboard/dashboard.component';
import { LoginComponent } from './components/cartera/login/login.component';
import { RegistroComponent } from './components/cartera/registro/registro.component';
import { VerificarCuentaComponent } from './components/cartera/verificar-cuenta/verificar-cuenta.component';
import { PanelAdminComponent } from './components/home/panel-admin/panel-admin.component';
import { ShowArticuloComponent } from './components/home/show-articulo/show-articulo.component';
import { AboutComponent } from './pages/about/about.component';
import { CarteraComponent } from './pages/cartera/cartera.component';
import { CriptoAnalisisComponent } from './pages/cripto-analisis/cripto-analisis.component';
import { HomeComponent } from './pages/home/home.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { ValoresAnalisisComponent } from './pages/valores-analisis/valores-analisis.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'analisis-valor', component: ValoresAnalisisComponent},
  {path: 'cartera', component: CarteraComponent},
  {path: 'cripto-analisis', component: CriptoAnalisisComponent},
  {path: 'balance', component: BalanceComponent},
  {path: 'income', component: IncomeComponent},
  {path: 'cashflow', component: CashFlowComponent},
  {path: 'precio-valor/:ticker/:name/:last_updated_utc', component: PrecioValorComponent},
  {path: 'fundamental-valor/:ticker/:name', component: FundamentalValorComponent},
  {path: 'news-valor/:ticker/:name', component: NewsValorComponent},
  {path: 'precio-cripto/:ticker/:name/:last_updated_utc', component: PrecioCriptoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'verificar-cuenta', component: VerificarCuentaComponent},
  {path: 'show-articulo/:id', component: ShowArticuloComponent},
  {path: 'panel-admin', component: PanelAdminComponent},
  {path: 'about', component: AboutComponent},
  {path: 'resources', component: ResourcesComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
