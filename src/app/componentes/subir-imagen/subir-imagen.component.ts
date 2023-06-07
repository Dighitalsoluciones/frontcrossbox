import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Imagen } from 'src/app/model/imagen';
import { ImagenService } from 'src/app/service/imagen.service';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css']
})
export class SubirImagenComponent implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef | undefined;

  imagen: File = null!;
  listaImagen: Imagen [] = [];

  constructor(private imagenService: ImagenService) { }

  ngOnInit(): void {
   this.traerLista();
  }

  onFileChange(event: any) {
    this.imagen = event.target.files[0];
  
  }

  onUpload(): void {
    this.imagenService.upload(this.imagen).subscribe( 
      data => {
        this.reload();
      },err => {
        alert(err.console.error.mensaje);   
      })
  }

  reload(){
    location.reload();
  }

  traerLista(){
    this.imagenService.list().subscribe(
      data=> {this.listaImagen = data}
    )
  }

  borrar(id: number): void {
    this.imagenService.delete(id).subscribe(
      data => {this.traerLista()},
      err => {
        alert("error al eliminar");
      }
    )

  }

  
}
