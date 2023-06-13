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
import { DetailAdmReservasComponent } from './componentes/menuadmin/adm-reservas/detail-adm-reservas.component';
import { SubirImagenComponent } from './componentes/subir-imagen/subir-imagen.component';
import { EditarimagenComponent } from './componentes/perfil/editarimagen.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'nuevousuario', component: NuevoLoginComponent},
  {path:'perfil', component: PerfilComponent, canActivate: [CanActivateViaAuthGuard]},
  {path:'editperfil', component: EditarperfilComponent, canActivate: [CanActivateViaAuthGuard]},
  {path:'admin', component: MenuadminComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'cargarsusc/:id', component: CargaSuscripcionComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'reservar', component: ReservarComponent, canActivate: [CanActivateViaAuthGuard]},
  {path:'nuevoturno', component: NuevaActividadComponent, canActivate: [CanActivateViaAuthGuard]},
  {path: 'reserva/:id', component: DetalleReservaComponent, canActivate: [CanActivateViaAuthGuard]},
  {path:'editperfil/pass', component: EditarpassComponent, canActivate: [CanActivateViaAuthGuard]},
  {path:'newdisciplina', component: NewDisciplinaComponent, canActivate: [CanActivateViaAuthGuard]},
  {path:'misreservas', component: MisReservasComponent, canActivate: [CanActivateViaAuthGuard]},
  {path:'editturno/:id', component: EditVerActividadComponent, canActivate: [CanActivateViaAuthGuard]},
  {path:'editdisciplina/:id', component: EditDisciplinaComponent, canActivate: [CanActivateViaAuthGuard]},
  {path:'detailreserva/:id', component: DetailAdmReservasComponent, canActivate: [CanActivateViaAuthGuard]},
 // {path:'probar', component: SubirImagenComponent},
  {path:'editperfil/img', component: EditarimagenComponent, canActivate: [CanActivateViaAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
