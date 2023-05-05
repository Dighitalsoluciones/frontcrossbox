import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';

const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-editarpass',
  templateUrl: './editarpass.component.html',
  styleUrls: ['./editarpass.component.css']
})
export class EditarpassComponent implements OnInit {
  usuario: NuevoUsuario = null!;
  usuarioLogeado: any;
  campoRepetir: string = "";

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioLogeado = sessionStorage.getItem(USERNAME_KEY);
      this.auth.detailName(this.usuarioLogeado).subscribe(
      data =>{
        this.usuario = data;
      }, err =>{
        alert("Error al modificar los datos del usuario");
        this.router.navigate(['perfil']);
      }
    )
  }

  onUpdatePass(): void{
    if(this.usuario.password == ""){
      alert("⛔ No se puede guardar el campo vacio")
    }else{
    const id = Number(this.usuario.id);
    this.auth.updatepass(id, this.usuario).subscribe(
      data => {alert("✅ Contraseña actualizada");
        this.router.navigate(['perfil']);
      }, err =>{
        alert("⛔ Error al modificar la contraseña ⛔");
        this.router.navigate(['perfil']);
      }
     )
    }
  }

  cancelar(): void {
    this.router.navigate(['perfil']);
  }

  botonGuardar() {
    if(this.usuario.password == this.campoRepetir){
      return false;
    }else{
      if(this.campoRepetir == "" && this.usuario.password == ""){
        return true;
      }else{
        return true;
      }
    }
  }

}
