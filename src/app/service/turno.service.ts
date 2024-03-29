import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../model/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  turnUrl = 'https://bkcrossbox-665d49fceaed.herokuapp.com/turnos/'

  constructor(private http: HttpClient) { }

  getTurnos(turno: Turno): Observable<Turno[]>{
    const url = `${this.turnUrl}/${turno.id}`
    return this.http.get<Turno[]>(url)
  }

  public lista(): Observable<Turno[]>{
    return this.http.get<Turno[]>(this.turnUrl + 'lista');
  }
  
  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.turnUrl + `delete/${id}`);
  }

  actualizarTurno(turno: Turno): Observable<Turno>{
    const url = `${this.turnUrl + 'update'}/${turno.id}`
    return this.http.put<Turno>(url, turno)
  }

  public save(turno: Turno): Observable<any>{
    return this.http.post<any>(this.turnUrl + 'create', turno);
  }

  public detail(id: number): Observable<Turno>{
    return this.http.get<Turno>(this.turnUrl + `detail/${id}`);
  }

}
