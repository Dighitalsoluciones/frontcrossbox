import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';

const AUTHORITIES_KEY = 'AuthAuthorities';

@Component({
  selector: 'app-carga-suscripcion',
  templateUrl: './carga-suscripcion.component.html',
  styleUrls: ['./carga-suscripcion.component.css']
})
export class CargaSuscripcionComponent implements OnInit {

  usuario: NuevoUsuario = null!;
  rol: any;
  usuarioLog: any;
  usuarioLogeado: any;

  constructor(private authServ: AuthService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.authServ.details(id).subscribe(
      data =>{
        this.usuario = data;
      }, err =>{
        alert("Error al cargar la suscripcion");
        this.router.navigate(['']);
      }
    )
    const authCodificado = sessionStorage.getItem(AUTHORITIES_KEY);
    this.rol = authCodificado ? JSON.stringify(atob(authCodificado)) : []; 
    this.traerUsuario(this.usuarioLogeado);  
  }

  traerUsuario(nombreUsuario: string): void{
    if(nombreUsuario != null){
    this.authServ.detailName(nombreUsuario).subscribe(data => {this.usuarioLog = data})
    }
  }

  isAdmin() {
    if(this.rol.includes("ROLE_ADMIN"))
      return true;
    else
      return false;
    }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.authServ.update(id, this.usuario).subscribe(
      data => {alert("✅ Articulo modificado correctamente");
        this.router.navigate(['']);
      }, err =>{
        alert("⛔ Error al modificar el usuario ⛔");
        this.router.navigate(['']);
      }
    )
    
  }

  guardar(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.authServ.update(id, this.usuario).subscribe(
      data => {alert("✅ Clases cargadas correctamente");
        }, err =>{
        alert("⛔ Error al cargar las clases ⛔");
      }
    )
    
  }

  cancelar(): void {
    this.router.navigate(['']);
  }

  enviarWhatsapp(){
    document.location.href ='https://wa.me/549'+ this.usuario.telefono;
  }

  cargarSuscripcion(){
    var cargar = (<HTMLInputElement>document.getElementById('inputclases')).value;
    var clasesActivas = Number(this.usuario.suscripcionActual) + Number(cargar);
    console.log(cargar);
    this.usuario.suscripcionActual = Number(clasesActivas);
    this.usuario.fechaActualSus = formatDate(Date.now(), 'dd/MM/yyyy hh:mm:ss', 'en-US');
    
  }

}
