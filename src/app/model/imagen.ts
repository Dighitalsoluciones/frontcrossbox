export class Imagen {
    id?: number;
    nombre: string;
    imagenUrl: string;
    imagenId: string;

    constructor(nombre: string, imagenUrl: string, imagenId: string){
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.imagenId = imagenId;
    }
}
