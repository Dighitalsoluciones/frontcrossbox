import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actividades } from '../model/actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiUrl = 'http://localhost:5000/actividades/'

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

  addActividad(actividad: Actividades): Observable<Actividades>{
    return this.http.post<Actividades>(this.apiUrl, actividad);
  }

  buscarActividades(fecha: Date): Observable<Actividades[]> {
    const url = `${this.apiUrl}?fecha=${fecha.toISOString()}`;
    return this.http.get<Actividades[]>(url);
  }

  reservarActividad(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/reservar`;
    return this.http.post(url, {});
  }
}
