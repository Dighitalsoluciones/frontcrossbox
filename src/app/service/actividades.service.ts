import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividades } from '../model/actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  apiUrl = 'https://bkcrossbox-665d49fceaed.herokuapp.com/actividades/'

  constructor(private http: HttpClient) { }

  public getActividades(): Observable<Actividades[]>{
    return this.http.get<Actividades[]>(this.apiUrl + 'lista');
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.apiUrl + `delete/${id}`);
  }

  public update(id: number, actividad: Actividades): Observable<any>{
    return this.http.put<any>(this.apiUrl + `update/${id}`, actividad);
  }

  crearActividad(actividad: Actividades): Observable<Actividades> {
    return this.http.post<Actividades>(this.apiUrl + 'crear', actividad);
  }

  public save(actividad: Actividades): Observable<any>{
    return this.http.post<any>(this.apiUrl + 'create', actividad);
  }

  buscarActividades(fecha: Date): Observable<Actividades[]> {
    const url = `${this.apiUrl}fecha/?fecha=${fecha}`;
    return this.http.get<Actividades[]>(url);
  }

  reservarActividad(id: number): Observable<any> {
    const url = `${this.apiUrl}reservar/${id}`;
    return this.http.post(url, {});
  }

  public details(id: number): Observable<Actividades>{
    return this.http.get<Actividades>(this.apiUrl + `detail/${id}`);
  }
}
