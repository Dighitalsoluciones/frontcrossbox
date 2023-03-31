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
fotoPerfil: string = "";
nombreUsuario: string = '';
email: string = '';
password: string = '';

suscripcionActual: number = 0;
fechaActualSus: string = '';
clasesTomadas: number = 0;
clasesRestantes: number = 0;

selectedFile: File = null!;

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


  //captura el valor del input y muestra la vista previa de la imagen subida
  capturarImagen(event: any) {
    this.selectedFile = event.target.files[0];
    this.convertToBase64();
    
  }

  convertToBase64() {
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      const base64 = reader.result as string;
      // Aquí puedes enviar la imagen en formato base64 a la base de datos o hacer cualquier otra cosa con ella
      
      this.fotoPerfil = base64.toString();
      console.log(base64);
      
    };
  }

}
