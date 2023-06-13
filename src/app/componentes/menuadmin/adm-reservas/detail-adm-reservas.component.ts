import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/model/turno';
import { AuthService } from 'src/app/service/auth.service';
import { TurnoService } from 'src/app/service/turno.service';

const AUTHORITIES_KEY = 'AuthAuthorities';

@Component({
  selector: 'app-detail-adm-reservas',
  templateUrl: './detail-adm-reservas.component.html',
  styleUrls: ['./detail-adm-reservas.component.css']
})
export class DetailAdmReservasComponent implements OnInit {
  detalleReserva: Turno = null!
  loading: boolean = false;
  usuario: any;
  botonConf: boolean = false;
  noMostrarBtnBorrar: boolean = true;

  rol: any;
  usuarioLog: any;
  usuarioLogeado: any;

  constructor(private reservaServ: TurnoService, private activatedRoute: ActivatedRoute, private authServ: AuthService, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.reservaServ.detail(id).subscribe(data => {this.detalleReserva = data});
    setTimeout(() => {this.loading = true}, 1200);
    
    const authCodificado = sessionStorage.getItem(AUTHORITIES_KEY);
    this.rol = authCodificado ? JSON.stringify(atob(authCodificado)) : []; 
    this.traerUsuario(this.usuarioLogeado);  
  }

  traerUsuario(nombreUsuario: string): void{
    this.authServ.detailName(nombreUsuario).subscribe(data => {this.usuarioLog = data})
    
  }

  isAdmin() {
    if(this.rol.includes("ROLE_ADMIN"))
      return true;
    else
      return false;
    }


  eliminar(id?: number){
    if(id != undefined){
      this.reservaServ.delete(id).subscribe(data =>{alert("✔ Registro eliminado correctamente");
      this.router.navigate(['admin']);
      },err =>{alert("No se pudo borrar el registro")},
      
       )
       }else{
        alert("No se pudo borrar el registro")
       }
  }

  traerDatosUsuario(){
    this.authServ.detailName(this.detalleReserva.nombreUsuario).subscribe(data => {this.usuario = data});
    this.usuario.clasesTomadas --;
    this.usuario.suscripcionActual ++;
    this.guardar();
    console.log(this.usuario.suscripcionActual);
  
  }

  guardar(): void{
    this.authServ.update(this.usuario.id, this.usuario).subscribe(
     data => {}, err =>{
       alert("⛔ No se pudo realizar la acción ⛔");
       this.router.navigate(['admin']);
     }
   )
}

mostrarBotonConf(){
  this.botonConf = true;
  this.noMostrarBtnBorrar = false;
}


}
