import { HttpClient } from '@angular/common/http';
import { Component, getNgModuleById, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
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
  userId: any;
  id1: any;
  usuarioLogeado: any;
  roles: string = "";

  constructor(private http: HttpClient, private router:Router, private route: ActivatedRoute, private tokenService: TokenService, private auth: AuthService) { }

  ngOnInit(): void {
    this.usuarioLogeado = sessionStorage.getItem(USERNAME_KEY);
    this.roles = JSON.stringify(sessionStorage.getItem(AUTHORITIES_KEY));   
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
    this.auth.detailName(nombreUsuario).subscribe(data => {this.usuario = data})
    
  }




  traerId(){
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log(this.userId)
      return this.userId ;
  });
  
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
    const authorities = JSON.parse(sessionStorage.getItem('AuthAuthorities'));
  
    // Verificar si el objeto contiene la autoridad 'ROLE_ADMIN'
    if (authorities && Array.isArray(authorities)) {
      return authorities.some((authority) => authority.authority === 'ROLE_ADMIN');
    }
  
    return false;
  } 
  */
}

