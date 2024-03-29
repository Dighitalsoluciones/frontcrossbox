export class NuevoUsuario {
    id?: number;
    nombre: string;
    apellido: string;
    dni: string;
    direccion: string;
    localidad: string;
    telefono: string;
    fotoPerfil: string;
    nombreUsuario: string;
    email: string;
    password: string;
    
    suscripcionActual!: number;
    fechaActualSus!: string;
    clasesTomadas!: number;
    clasesRestantes!: number;
    authorities!: string[];
    idImagenCloudinary: string;

    constructor(nombre: string, apellido: string, dni: string, direccion: string, localidad: string, telefono: string,
        fotoPerfil: string, nombreUsuario: string, email: string, password: string, suscripcionActual: number,
        fechaActualSus: string, clasesTomadas: number, clasesRestantes: number, idImagenCloudinary: string){
            
            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.direccion = direccion;
            this.localidad = localidad;
            this.telefono = telefono;
            this.fotoPerfil = fotoPerfil;
            this.nombreUsuario = nombreUsuario;
            this.email = email;
            this.password = password;
           
            this.suscripcionActual = suscripcionActual;
            this.fechaActualSus = fechaActualSus;
            this.clasesTomadas = clasesTomadas;
            this.clasesRestantes = clasesRestantes;
            this.idImagenCloudinary = idImagenCloudinary;
        }
}
