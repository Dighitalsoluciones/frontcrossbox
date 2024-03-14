import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Disciplinas } from '../model/disciplinas';

@Injectable({
  providedIn: 'root'
})
export class DisciplinasService {
  disURL = 'http://localhost:8080/disciplinas/'

  constructor(private httpClient: HttpClient) { }
  
  public lista(): Observable<Disciplinas[]>{
    return this.httpClient.get<Disciplinas[]>(this.disURL + 'lista');
  }

  public detail(id: number): Observable<Disciplinas>{
    return this.httpClient.get<Disciplinas>(this.disURL + `detail/${id}`);
  }
  //con esta declaracion traigo los datos de la disciplina de mi back por el nombre
  public detailName(nombre: string): Observable<Disciplinas> {
    return this.httpClient.get<Disciplinas>(this.disURL + `detailname/${nombre}`);
  }

  public save(disciplinas: Disciplinas): Observable<any>{
    return this.httpClient.post<any>(this.disURL + 'create', disciplinas);
  }
  
  public update(id: number, disciplinas: Disciplinas): Observable<any>{
    return this.httpClient.put<any>(this.disURL + `update/${id}`, disciplinas);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.disURL + `delete/${id}`);
  }
}
