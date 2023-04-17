export class Actividades {
    id?: number;
    nombre: string;
    descripcion: string;
    dia: string;
    horario: string;
    cupo: number;

    constructor(nombre: string, descripcion: string, dia: string, horario: string, cupo: number){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.dia = dia;
        this.horario = horario;
        this.cupo = cupo;
    }
}
