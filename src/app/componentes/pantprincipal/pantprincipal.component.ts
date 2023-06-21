import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Component({
  selector: 'app-pantprincipal',
  templateUrl: './pantprincipal.component.html',
  styleUrls: ['./pantprincipal.component.css']
})
export class PantprincipalComponent implements OnInit {
  isLogged = false;
  usuario: any;
  id1: any;
  usuarioLogeado: any;
  roles: any;

  constructor(private http: HttpClient, private router:Router, private route: ActivatedRoute, private tokenService: TokenService, private auth: AuthService) { }

  ngOnInit(): void {
    const usuarioCodificado = sessionStorage.getItem(USERNAME_KEY);
    this.usuarioLogeado = usuarioCodificado ? JSON.parse(atob(usuarioCodificado)) : null;
    const authCodificado = sessionStorage.getItem(AUTHORITIES_KEY);
    this.roles = authCodificado ? JSON.stringify(atob(authCodificado)) : []; 
    this.traerUsuario(this.usuarioLogeado);  
      
    if(this.tokenService.getToken()){
      this.isLogged= true;
    }else{
      this.isLogged = false;
    }
  }

  onLogout(): void{
    this.tokenService.logOut();
    window.location.reload();
  }

  login(){
    this.router.navigate(['/login'])
  }

 
  traerUsuario(nombreUsuario: string): void{
    if(nombreUsuario != null){
    this.auth.detailName(nombreUsuario).subscribe(data => {this.usuario = data})
    }
  }


  //con esta funcion determino si el usuario logeado es administrador
  IsAdmin() {
  if(this.roles.includes("ROLE_ADMIN"))
    return true;
  else
    return false;
  }

  //otra manera de hacer lo mismo
  /*
  IsAdmin2() {
    // Obtener el objeto de autoridades almacenado en sessionStorage
    const authCodificado = sessionStorage.getItem(AUTHORITIES_KEY);
    this.roles = authCodificado ? JSON.parse(atob(authCodificado)) : [];
  
    // Verificar si el objeto contiene la autoridad 'ROLE_ADMIN'
    if (authorities && Array.isArray(authorities)) {
      return authorities.some((authority) => authority.authority === 'ROLE_ADMIN');
    }
  
    return false;
  } 
  */
}

