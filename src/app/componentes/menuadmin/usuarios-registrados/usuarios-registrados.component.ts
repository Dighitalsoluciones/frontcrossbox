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
  usuariosFiltrados: NuevoUsuario[] = [];
  usuariosFiltradosPorEmail: NuevoUsuario[] = [];
  filtrarUsuariosReg: string = "";
  filtrarUsuariosEmail: string = '';
  filtro: string = "";
  modalEliminarUsuario = "none";
  fechas: Fecha[] = [];
  fechaInicio: any;
  fechaFin: any;
  loading = false;
  usuario: any;
  p: number = 0;
  backendPage = 0;
  mostrarSoloFiltrados: boolean = false;
  botonBuscar: boolean = true;

  buscarPorEmail: boolean = false;
  buscarPorApellido: boolean = false;

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.listaUsuarios();
    setTimeout(() => {
      this.loading = true;
    }, 1200);

  }

  listaUsuarios(): void {
    this.mostrarSoloFiltrados = false;
    this.filtrarUsuariosReg = "";
    this.p = 0;
    this.botonBuscar = true;
    this.authService.lista(this.p, 12).subscribe(data => {
      this.usuariosRegistrados = data;
    });
  }

  filtrarPorUsuarios() {
    this.mostrarSoloFiltrados = true;
    this.botonBuscar = false;
    this.buscarPorApellido = false;
    this.buscarPorEmail = false;
    this.p = 0;
    // Valor del input en minúsculas
    this.filtro = this.filtrarUsuariosReg.toLowerCase();
    if (this.filtro.length !== 0) {
      this.authService.listaFiltro(this.filtro).subscribe(data => {
        this.usuariosFiltrados = data;
      });
    } else {
      this.listaUsuarios();
    }
  }

  filtrarPorEmail() {
    this.mostrarSoloFiltrados = true;
    this.botonBuscar = false;
    this.buscarPorApellido = false;
    this.buscarPorEmail = false;
    this.p = 0;
    // Valor del input en minúsculas
    this.filtro = this.filtrarUsuariosEmail.toLowerCase();
    if (this.filtro.length !== 0) {
      this.authService.buscarPorEmail(this.filtro).subscribe(data => {
        this.usuariosFiltrados = data;
        this.filtrarUsuariosEmail = '';
      });
    } else {
      this.listaUsuarios();
    }
  }

  activarBusquedaPorApellido() {
    this.buscarPorApellido = true;
    this.buscarPorEmail = false;
  }

  activarBusquedaPorEmail() {
    this.buscarPorApellido = false;
    this.buscarPorEmail = true;
  }

  listaUsuariosPaginados(p: number): void {
    this.authService.lista(p, 15).subscribe(data => {
      this.usuariosRegistrados = data;
    });
  }

  abrirModalEliminarUsuario() {
    this.modalEliminarUsuario = "block";
  }
  cerrarModalEliminarUsuario() {
    this.modalEliminarUsuario = "none";
  }

  delete(id?: number) {
    if (id != undefined) {
      this.authService.delete(id).subscribe(
        data => {
          alert("✅ Usuario borrado correctamente");
          this.listaUsuariosPaginados(this.backendPage);
        }, err => {
          alert("No se pudo borrar el usuario");
        }
      )
    } else {
      alert("No se pudo borrar el usuario");
    }
  }

  pageChanged(event: number) {
    this.p = event;
    this.backendPage = event - 1;
    this.listaUsuariosPaginados(this.backendPage);
  }

}
