import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PARTS
import { SidenavComponent } from './parts/sidenav/sidenav.component';
import { FooterComponent } from './parts/footer/footer.component';

// PAGES
import { HomeComponent } from './pages/home/home.component';
import { ValoresAnalisisComponent } from './pages/valores-analisis/valores-analisis.component';
import { CarteraComponent } from './pages/cartera/cartera.component';

// ANGULAR MATERIAL
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

// COMPONENTES
// -> ANALISIS-VALOR
import { ListaValorComponent } from './components/analisis-valor/lista-valor/lista-valor.component';
import { PrecioValorComponent } from './components/analisis-valor/precio-valor/precio-valor.component';
import { NewsValorComponent } from './components/analisis-valor/news-valor/news-valor.component';
import { FundamentalValorComponent } from './components/analisis-valor/fundamental-valor/fundamental-valor.component';
import { BalanceComponent } from './components/analisis-valor/fundamentales-comp/balance/balance.component';
import { CashFlowComponent } from './components/analisis-valor/fundamentales-comp/cash-flow/cash-flow.component';
import { IncomeComponent } from './components/analisis-valor/fundamentales-comp/income/income.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiInterceptorService } from './services/api-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// -> HOME
import { BlogComponent } from './components/home/blog/blog.component';

// -> CARTERA
import { LoginComponent } from './components/cartera/login/login.component';
import { DashboardComponent } from './components/cartera/dashboard/dashboard.component';
import { RegistroComponent } from './components/cartera/registro/registro.component';

// PIPES
import { CantidadMonedaPipe } from './pipes/cantidad-moneda.pipe';

// FIREBASE
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

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
    CantidadMonedaPipe,
    CarteraComponent,
    LoginComponent,
    DashboardComponent,
    RegistroComponent
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
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
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
