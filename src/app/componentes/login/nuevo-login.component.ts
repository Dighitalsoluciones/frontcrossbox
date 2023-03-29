import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Usuarios } from 'src/app/model/usuarios';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-nuevo-login',
  templateUrl: './nuevo-login.component.html',
  styleUrls: ['./nuevo-login.component.css']
})
export class NuevoLoginComponent implements OnInit {

nombre: string = '';
apellido: string = '';
dni: string = '';
direccion: string = '';
localidad: string = '';
telefono: string = '';
fotoPerfil: string = "https://res.cloudinary.com/dighitalsoluciones/image/upload/v1659721546/IMG%20PROYECTO%20INTEGRADOR/2_asjgvq.png";
nombreUsuario: string = '';
email: string = '';
password: string = '';

suscripcionActual: number = 0;
fechaActualSus: string = '';
clasesTomadas: number = 0;
clasesRestantes: number = 0;


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    const nuevousuario = new NuevoUsuario(this.nombre, this.apellido, this.dni, this.direccion, this.localidad, this.telefono,
      this.fotoPerfil, this.nombreUsuario, this.email, this.password, this.suscripcionActual,
      this.fechaActualSus, this.clasesTomadas, this.clasesRestantes);
    this.auth.nuevo(nuevousuario).subscribe(
      data=>{alert("✅ Usuario creado correctamente");
      this.router.navigate(['']);
    }, err =>{
      alert("⛔Nombre de Usuario ya existente o debes completar todos los campos⛔");
      this.router.navigate(['login'])
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['login']);
  }

}
