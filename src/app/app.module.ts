import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { PantprincipalComponent } from './componentes/pantprincipal/pantprincipal.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NuevoLoginComponent } from './componentes/login/nuevo-login.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { EditarperfilComponent } from './componentes/perfil/editarperfil.component';
import { DisciplinasComponent } from './componentes/disciplinas/disciplinas.component';
import { NewDisciplinaComponent } from './componentes/disciplinas/new-disciplina.component';
import { EditDisciplinaComponent } from './componentes/disciplinas/edit-disciplina.component';
import { MenuadminComponent } from './componentes/menuadmin/menuadmin.component';
import { UsuariosRegistradosComponent } from './componentes/menuadmin/usuarios-registrados/usuarios-registrados.component';
import { FiltrarUsuariosPipe } from './pipes/filtrar-usuarios.pipe';
import { CargaSuscripcionComponent } from './componentes/menuadmin/carga-suscripcion/carga-suscripcion.component';
import { SpinnerdecargaComponent } from './componentes/spinnerdecarga/spinnerdecarga.component';
import { ReservarComponent } from './componentes/reservar/reservar.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { OrdenarporHsPipe } from './pipes/ordenarpor-hs.pipe';
import { NuevaActividadComponent } from './componentes/menuadmin/nueva-actividad/nueva-actividad.component';
import { DetalleReservaComponent } from './componentes/reservar/detalle-reserva.component';
import { EditarpassComponent } from './componentes/perfil/editarpass.component';
import { MisReservasComponent } from './componentes/mis-reservas/mis-reservas.component';
//esto es para cambiar el formato de la hora de EN a Español
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { FiltrarActividadesPipe } from './pipes/filtrar-actividades.pipe';
import { VerActividadComponent } from './componentes/menuadmin/ver-actividad/ver-actividad.component';
import { EditVerActividadComponent } from './componentes/menuadmin/ver-actividad/edit-ver-actividad/edit-ver-actividad.component';
import { AdmReservasComponent } from './componentes/menuadmin/adm-reservas/adm-reservas.component';
import { DetailAdmReservasComponent } from './componentes/menuadmin/adm-reservas/detail-adm-reservas.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubirImagenComponent } from './componentes/subir-imagen/subir-imagen.component';
import { EditarimagenComponent } from './componentes/perfil/editarimagen.component';
registerLocaleData(localeEs, 'es');



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PantprincipalComponent,
    NuevoLoginComponent,
    PerfilComponent,
    EditarperfilComponent,
    DisciplinasComponent,
    NewDisciplinaComponent,
    EditDisciplinaComponent,
    MenuadminComponent,
    UsuariosRegistradosComponent,
    FiltrarUsuariosPipe,
    CargaSuscripcionComponent,
    SpinnerdecargaComponent,
    ReservarComponent,
    CalendarioComponent,
    OrdenarporHsPipe,
    NuevaActividadComponent,
    DetalleReservaComponent,
    EditarpassComponent,
    MisReservasComponent,
    FiltrarActividadesPipe,
    VerActividadComponent,
    EditVerActividadComponent,
    AdmReservasComponent,
    DetailAdmReservasComponent,
    SubirImagenComponent,
    EditarimagenComponent,
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
