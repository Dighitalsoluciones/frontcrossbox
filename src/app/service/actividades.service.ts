import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividades } from '../model/actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  apiUrl = 'http://localhost:8080/actividades/'

  constructor(private http: HttpClient) { }

  getActividades(): Observable<Actividades[]>{
    
    return this.http.get<Actividades[]>(this.apiUrl)
  }
  
  deleteActividad(actividad: Actividades): Observable<Actividades>{
    const url = `${this.apiUrl}/${actividad.id}`
    return this.http.delete<Actividades>(url)
  }

  updateActividad(actividad: Actividades): Observable<Actividades>{
    const url = `${this.apiUrl}/${actividad.id}`
    return this.http.put<Actividades>(url, actividad)
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
