import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Injectable({providedIn: 'root'})
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.tokenService.getToken()) {
      console.log("No estás logueado");
      this.router.navigate(["/"]);
      return false;
    }

    return true;
  }
}

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {
  roles: string = "";
  usuariosRegistrados = false;
  disciplinas = false;
  crearTurnos = false;
  reservas = false;

  constructor() { }

  ngOnInit(): void {
  }
   
  mostrarUsuariosRegistrados(){
    this.usuariosRegistrados = true;
    this.disciplinas = false;  
    this.crearTurnos = false;
    this.reservas = false;
  }

  mostrarDisciplinas(){
    this.disciplinas = true;
    this.usuariosRegistrados = false;
    this.crearTurnos = false;
    this.reservas = false;
  }

  mostrarCrearTurnos(){
    this.crearTurnos = true;
    this.disciplinas = false;
    this.usuariosRegistrados = false;
    this.reservas = false;
  }

  mostrarReservas(){
    this.reservas = true;
    this.crearTurnos = false;
    this.disciplinas = false;
    this.usuariosRegistrados = false;
  }
}
