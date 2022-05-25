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
import { MatDialogModule } from '@angular/material/dialog';

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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// -> HOME
import { BlogComponent } from './components/home/blog/blog.component';
import { AddArticuloComponent } from './components/home/add-articulo/add-articulo.component';

// -> CARTERA
import { LoginComponent } from './components/cartera/login/login.component';
import { DashboardComponent } from './components/cartera/dashboard/dashboard.component';
import { RegistroComponent } from './components/cartera/registro/registro.component';
import { PosicionesCarteraComponent } from './components/cartera/posiciones-cartera/posiciones-cartera.component';

// PIPES
import { CantidadMonedaPipe } from './pipes/cantidad-moneda.pipe';

// FIREBASE
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// INTERCEPTORS
import { ApiInterceptorService } from './services/api-interceptor.service';
import { CriptoAnalisisComponent } from './pages/cripto-analisis/cripto-analisis.component';
import { ListaCriptoComponent } from './components/analisis-cripto/lista-cripto/lista-cripto.component';
import { CriptoFilterPipe } from './pipes/cripto-filter.pipe';
import { DetallesCriptoComponent } from './components/analisis-cripto/detalles-cripto/detalles-cripto.component';
import { DialogOperacionesComponent } from './components/cartera/dialog-operaciones/dialog-operaciones.component';
import { PrecioCriptoComponent } from './components/analisis-cripto/precio-cripto/precio-cripto.component';
import { RentabilidadesCarteraComponent } from './components/cartera/rentabilidades-cartera/rentabilidades-cartera.component';
import { AuthService } from './services/auth.service';
import { VerificarCuentaComponent } from './components/cartera/verificar-cuenta/verificar-cuenta.component';
import { ShowArticuloComponent } from './components/home/show-articulo/show-articulo.component';
import { PanelAdminComponent } from './components/home/panel-admin/panel-admin.component';
import { AboutComponent } from './pages/about/about.component';
import { ResourcesComponent } from './pages/resources/resources.component';

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
    RegistroComponent,
    AddArticuloComponent,
    PosicionesCarteraComponent,
    CriptoAnalisisComponent,
    ListaCriptoComponent,
    CriptoFilterPipe,
    DetallesCriptoComponent,
    DialogOperacionesComponent,
    PrecioCriptoComponent,
    RentabilidadesCarteraComponent,
    VerificarCuentaComponent,
    ShowArticuloComponent,
    PanelAdminComponent,
    AboutComponent,
    ResourcesComponent
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
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
