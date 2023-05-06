export class Disciplinas {
  id?: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  profesor: string;

  constructor(
    nombre: string,
    descripcion: string,
    imagen: string,
    profesor: string) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.profesor = profesor;
   
  }
}
