import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import {MenubarModule} from 'primeng/menubar';
import { UsuarioModule } from './usuario/usuario.module';
import { HomeModule } from './home/home.module';
import { LigasModule } from './campeonato/ligas/ligas.module';
import { ClubeModule } from './campeonato/clube/clube.module';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    MenubarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    UsuarioModule,
    HomeModule,
    LigasModule,
    ClubeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
