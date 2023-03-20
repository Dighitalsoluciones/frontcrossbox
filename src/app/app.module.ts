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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PantprincipalComponent,
    NuevoLoginComponent,
    PerfilComponent,
    EditarperfilComponent,
  
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
