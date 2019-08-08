import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing, appRoutingProviders} from './app-routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AmigosComponent } from './components/amigos/amigos.component';
import { TorneosComponent } from './components/torneos/torneos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { ForoComponent } from './components/foro/foro.component';
import { ForoidComponent } from './components/foroid/foroid.component';
import { VersusComponent } from './components/versus/versus.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ModyresVersusComponent } from './components/modyres-versus/modyres-versus.component';
import { DetalleVersusComponent } from './components/detalle-versus/detalle-versus.component';
import { FooterComponent } from './components/footer/footer.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { from } from 'rxjs';
import { CreditosComponent } from './components/creditos/creditos.component';
import { TorneoidComponent } from './components/torneoid/torneoid.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AmigosComponent,
    TorneosComponent,
    SolicitudesComponent,
    ForoComponent,
    ForoidComponent,
    VersusComponent,
    NoticiasComponent,
    LoginComponent,
    RegistroComponent,
    ModyresVersusComponent,
    DetalleVersusComponent,
    FooterComponent,
    TiendaComponent,
    CreditosComponent,
    TorneosComponent,
    TorneoidComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClarityModule,
    routing,
    MomentModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
