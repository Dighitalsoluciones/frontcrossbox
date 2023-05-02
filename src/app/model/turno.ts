import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export class Turno {
    id?: number;
    actividad: string;
    dia: string;
    horario: string;
    nombre: string;
    apellido: string;
    dni: string;
    telefono: string;
    fotoPerfil: string;
    nombreUsuario: string;

    constructor(actividad: string, dia: string, horario: string, nombre: string, apellido: string, dni: string,
        telefono: string, fotoPerfil: string, nombreUsuario: string){
            this.actividad = actividad;
            this.dia = dia;
            this.horario = horario;
            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.telefono = telefono;
            this.fotoPerfil = fotoPerfil;
            this.nombreUsuario = nombreUsuario;
        }
}
