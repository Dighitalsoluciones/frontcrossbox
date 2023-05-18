import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDisciplinaComponent } from './componentes/disciplinas/new-disciplina.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { NuevoLoginComponent } from './componentes/login/nuevo-login.component';
import { CargaSuscripcionComponent } from './componentes/menuadmin/carga-suscripcion/carga-suscripcion.component';
import { CanActivateViaAuthGuard, MenuadminComponent } from './componentes/menuadmin/menuadmin.component';
import { NuevaActividadComponent } from './componentes/menuadmin/nueva-actividad/nueva-actividad.component';
import { EditarpassComponent } from './componentes/perfil/editarpass.component';
import { EditarperfilComponent } from './componentes/perfil/editarperfil.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { DetalleReservaComponent } from './componentes/reservar/detalle-reserva.component';
import { ReservarComponent } from './componentes/reservar/reservar.component';
import { MisReservasComponent } from './componentes/mis-reservas/mis-reservas.component';
import { EditVerActividadComponent } from './componentes/menuadmin/ver-actividad/edit-ver-actividad/edit-ver-actividad.component';
import { EditDisciplinaComponent } from './componentes/disciplinas/edit-disciplina.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'nuevousuario', component: NuevoLoginComponent},
  {path:'perfil', component: PerfilComponent},
  {path:'editperfil', component: EditarperfilComponent},
  {path:'admin', component: MenuadminComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'cargarsusc/:id', component: CargaSuscripcionComponent},
  {path: 'reservar', component: ReservarComponent},
  {path:'nuevoturno', component: NuevaActividadComponent},
  {path: 'reserva/:id', component: DetalleReservaComponent},
  {path:'editperfil/pass', component: EditarpassComponent},
  {path:'newdisciplina', component: NewDisciplinaComponent},
  {path:'misreservas', component: MisReservasComponent},
  {path:'editturno/:id', component: EditVerActividadComponent},
  {path:'editdisciplina/:id', component: EditDisciplinaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
