import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PARTS
import { SidenavComponent } from './parts/sidenav/sidenav.component';
import { FooterComponent } from './parts/footer/footer.component';

// PAGES

import { ValoresAnalisisComponent } from './pages/valores-analisis/valores-analisis.component';

// ANGULAR MATERIAL
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

// COMPONENTES
// -> ANALISIS-VALOR
import {ListaValorComponent} from './components/analisis-valor/lista-valor/lista-valor.component';
import { PrecioValorComponent } from './components/analisis-valor/precio-valor/precio-valor.component';

import { FormsModule } from '@angular/forms';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewsValorComponent } from './components/analisis-valor/news-valor/news-valor.component';
import { FundamentalValorComponent } from './components/analisis-valor/fundamental-valor/fundamental-valor.component';
import { BalanceComponent } from './components/analisis-valor/fundamentales-comp/balance/balance.component';
import { CashFlowComponent } from './components/analisis-valor/fundamentales-comp/cash-flow/cash-flow.component';
import { IncomeComponent } from './components/analisis-valor/fundamentales-comp/income/income.component';

// -> HOME
import { BlogComponent } from './components/home/blog/blog.component';
import { HomeComponent } from './pages/home/home.component';


// PIPES
import { CantidadMonedaPipe } from './pipes/cantidad-moneda.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    FooterComponent,
    ValoresAnalisisComponent,
    ListaValorComponent,
    NewsValorComponent,
    PrecioValorComponent,
    BlogComponent,
    HomeComponent,
    FundamentalValorComponent,
    BalanceComponent,
    CashFlowComponent,
    IncomeComponent,
    CantidadMonedaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
