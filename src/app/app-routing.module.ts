import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { NuevoLoginComponent } from './componentes/login/nuevo-login.component';
import { CargaSuscripcionComponent } from './componentes/menuadmin/carga-suscripcion/carga-suscripcion.component';
import { CanActivateViaAuthGuard, MenuadminComponent } from './componentes/menuadmin/menuadmin.component';
import { EditarperfilComponent } from './componentes/perfil/editarperfil.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ReservarComponent } from './componentes/reservar/reservar.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'nuevousuario', component: NuevoLoginComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'editperfil', component: EditarperfilComponent},
  {path:'admin', component: MenuadminComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'cargarsusc/:id', component: CargaSuscripcionComponent},
  {path: 'reservar', component: ReservarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
