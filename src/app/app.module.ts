import { NgModule } from '@angular/core';
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
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
