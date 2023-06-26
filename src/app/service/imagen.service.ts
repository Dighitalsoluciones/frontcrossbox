import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from '../model/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  imagenURL = 'https://bkcrossbox-665d49fceaed.herokuapp.com/cloudinary/'

  constructor(private httpClient: HttpClient) { }

  public upload(imagen: File): Observable<any>{
     const formData = new FormData();
     formData.append('multipartFile', imagen);
     return this.httpClient.post<any>(this.imagenURL + 'upload', formData);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.imagenURL + `delete/${id}`);
  }

  public list(): Observable<Imagen[]>{
    return this.httpClient.get<Imagen[]>(this.imagenURL + 'lista');
  }
}
