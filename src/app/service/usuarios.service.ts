import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto';
import { LoginUsuario } from '../model/login-usuario';
import { Usuarios } from '../model/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  authURL = 'http://localhost:8080/auth/'
  constructor(private httpClient: HttpClient) { }

  public nuevo(usuarios: Usuarios): Observable<any>{
    return this.httpClient.post<any>(this.authURL + 'nuevo', usuarios);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }

  
}
