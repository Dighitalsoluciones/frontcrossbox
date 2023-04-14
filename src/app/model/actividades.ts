export class Actividades {
    id?: number;
    nombre: string;
    dias: string [];
    horarios: string [];

    constructor(nombre: string, dias: string [], horarios: string []){
        this.nombre = nombre;
        this.dias = dias;
        this.horarios = horarios;
    }
}
