import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  fechaURL = 'https://bkcrossbox-665d49fceaed.herokuapp.com/fechas/'
  constructor(private httpClient: HttpClient) { }

  public getFechas(fechaInicio: Date, fechaFin: Date): Observable<any> {
    const param = {
      fechaInicio: fechaInicio.toISOString,
      fechaFin: fechaFin.toISOString,
    };

    return this.httpClient.get<any>(this.fechaURL + 'todas' + "?" +  { fechaInicio } + {fechaFin});
}
}
