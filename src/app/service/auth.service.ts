import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NuevoUsuario } from '../model/nuevo-usuario';
import { LoginUsuario } from '../model/login-usuario';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto';
import { Usuarios } from '../model/usuarios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  authURL = 'https://bkcrossbox-665d49fceaed.herokuapp.com/auth/'
  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }

  public getUsuario(id: number): Observable<NuevoUsuario> {
    return this.httpClient.get<NuevoUsuario>(this.authURL + `detail/${id}`);

  }

  //con esta declaracion traigo los datos del usuario de mi back
  public detailName(nombreUsuario: string): Observable<NuevoUsuario> {
    return this.httpClient.get<NuevoUsuario>(this.authURL + `detailname/${nombreUsuario}`);
  }

  public recovery(email: string): Observable<NuevoUsuario> {
    return this.httpClient.get<NuevoUsuario>(this.authURL + `recovery/${email}`);
  }

  //agregado para poder completar el CRUD
  public details(id: number): Observable<NuevoUsuario> {
    return this.httpClient.get<NuevoUsuario>(this.authURL + `detail/${id}`);
  }


  public update(id: number, nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.put<any>(this.authURL + `update/${id}`, nuevoUsuario);
  }

  public updatepass(id: number, nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.put<any>(this.authURL + `updatepass/${id}`, nuevoUsuario);
  }

  public updateimg(id: number, nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.put<any>(this.authURL + `updateimg/${id}`, nuevoUsuario);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.authURL + `delete/${id}`);
  }

  public uploadImage(imageData: string, id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    const body = { imageData: imageData };
    return this.httpClient.post<any>(this.authURL + `update/${id}`, body, options);
  }

  public lista(page: number, size: number): Observable<NuevoUsuario[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<NuevoUsuario[]>(`${this.authURL}lista`, { params });
  }

  public listaFiltro(filtro: string): Observable<NuevoUsuario[]> {
    return this.httpClient.get<NuevoUsuario[]>(`${this.authURL}listaFiltro?filtro=${filtro}`);
}
}
