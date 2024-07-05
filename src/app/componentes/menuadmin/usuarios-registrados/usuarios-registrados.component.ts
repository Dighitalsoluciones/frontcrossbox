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

  res: any[] = [];
  usuariosRegistrados: any;
  filtrarUsuariosReg = [];
  modalEliminarUsuario= "none";
  fechas: Fecha [] = [];
  fechaInicio: any;
  fechaFin: any;
  loading = false;
  usuario: any;
  p: number = 0;
  backendPage = 0;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.listaUsuarios();
    setTimeout(() => {
      this.loading = true;
    }, 1200);
   
  }

  listaUsuarios(): void {
    this.authService.lista(this.p, 12).subscribe(data => {
      this.usuariosRegistrados = data;
    });
  }

  listaUsuariosConFiltro(page: number): void {
    this.authService.lista(page, 1000).subscribe(data => {
      // Filtra los usuarios aquí antes de asignarlos a la variable
      const usuariosFiltrados = this.usuariosRegistrados.content.filter((usuario: { apellido: never[][]; }) => {
        // Aplica tu lógica de filtrado (por ejemplo, por nombre o algún otro criterio)
        // Devuelve true si el usuario debe incluirse en la lista filtrada
        return usuario.apellido.includes(this.filtrarUsuariosReg);
      });
  
      // Asigna los usuarios filtrados a la variable
      this.usuariosRegistrados = { ...data, content: usuariosFiltrados };
    });
  }

  listaUsuariosPaginados(p: number): void {
    this.authService.lista(p, 15).subscribe(data => {
      this.usuariosRegistrados = data;
    });
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
          this.listaUsuariosPaginados(this.backendPage);
        }, err =>{
          alert("No se pudo borrar el usuario");
        }
      )
    } else{
      alert("No se pudo borrar el usuario");
    }
  }

  pageChanged(event: number) {
    this.p = event;
    this.backendPage = event - 1;
    this.listaUsuariosPaginados(this.backendPage);
  }

}
