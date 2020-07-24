import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './home/home.component';
import { LigasComponent } from './campeonato/ligas/ligas.component';
import { ClubeComponent } from './campeonato/clube/clube.component';

const routes: Routes = [
  { 
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'usuario',
    component: UsuarioComponent
  },
  {
    path: 'clubes',
    component: ClubeComponent
  },
  {
    path: 'ligas',
    component: LigasComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/home'
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {useHash:true})
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
