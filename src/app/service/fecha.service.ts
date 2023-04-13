import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  fechaURL = 'http://localhost:8080/fechas/'
  constructor(private httpClient: HttpClient) { }

  public getFechas(fechaInicio: Date, fechaFin: Date): Observable<any> {
    const param = {
      fechaInicio: fechaInicio.toISOString,
      fechaFin: fechaFin.toISOString,
    };

    return this.httpClient.get<any>(this.fechaURL + 'todas' + "?" +  { fechaInicio } + {fechaFin});
}
}
