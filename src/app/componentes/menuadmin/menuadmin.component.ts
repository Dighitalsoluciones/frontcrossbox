import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
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

  constructor() { }

  ngOnInit(): void {
  }
   
  mostrarUsuariosRegistrados(){
    this.usuariosRegistrados = true;
    this.disciplinas = false;  
  }

  mostrarDisciplinas(){
    this.disciplinas = true;
    this.usuariosRegistrados = false;
  }
}
