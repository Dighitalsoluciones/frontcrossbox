import { Component, OnInit } from '@angular/core';
import { Fecha } from 'src/app/model/fecha';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-usuarios-registrados',
  templateUrl: './usuarios-registrados.component.html',
  styleUrls: ['./usuarios-registrados.component.css']
})
export class UsuariosRegistradosComponent implements OnInit {

  usuariosRegistrados: NuevoUsuario[] = [];
  FiltrarUsuariosReg = [];
  modalEliminarUsuario= "none";
  fechas: Fecha [] = [];
  fechaInicio: any;
  fechaFin: any;
  loading = false;
  usuario: any;
  p: number = 1;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.listaUsuarios();
    setTimeout(() => {
      this.loading = true;
    }, 1200);
   
  }

  listaUsuarios(): void{
    this.authService.lista().subscribe(data => {this.usuariosRegistrados = data;})
  }
  
  abrirModalEliminarUsuario(){
    this.modalEliminarUsuario = "block";
  }
  cerrarModalEliminarUsuario(){
    this.modalEliminarUsuario = "none";
  }

  delete(id?: number){
    if(id != undefined){
        this.authService.delete(id).subscribe(
        data =>{alert("✅ Usuario borrado correctamente");
          this.listaUsuarios();
        }, err =>{
          alert("No se pudo borrar el usuario");
        }
      )
    } else{
      alert("No se pudo borrar el usuario");
    }
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.listaUsuarios();
}

}
