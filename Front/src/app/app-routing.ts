import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';

import { HomeComponent } from './components/home/home.component';
import { AmigosComponent } from './components/amigos/amigos.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { ForoComponent } from './components/foro/foro.component';
import { ForoidComponent } from './components/foroid/foroid.component';
import { VersusComponent } from './components/versus/versus.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { LoginComponent } from './components/login/login.component'
import { RegistroComponent } from './components/registro/registro.component';
import { ModyresVersusComponent } from './components/modyres-versus/modyres-versus.component';
import { DetalleVersusComponent } from './components/detalle-versus/detalle-versus.component';
import { TiendaComponent } from './components/tienda/tienda.component';
import { CreditosComponent } from './components/creditos/creditos.component';
import { TorneosComponent } from './components/torneos/torneos.component';
import { TorneoidComponent } from './components/torneoid/torneoid.component';





const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: '', redirectTo: 'home', pathMatch:'full'},   
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'home', component: HomeComponent},
  {path: 'amigos', component: AmigosComponent},
  {path: 'solicitudes', component: SolicitudesComponent},
  {path: 'foro', component: ForoComponent},
  {path: 'foroid', component: ForoidComponent},
  {path: 'versus', component: VersusComponent},
  {path: 'noticias', component: NoticiasComponent},
  {path: 'resultados', component: ModyresVersusComponent},
  {path: 'detalleVersus', component: DetalleVersusComponent},
  {path: 'tienda', component: TiendaComponent},
  {path: 'creditos', component: CreditosComponent},
  {path: 'torneos', component: TorneosComponent},
  {path: 'torneoid', component: TorneoidComponent},

  {path: '**', component: HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)
