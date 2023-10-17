import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Actividades } from 'src/app/model/actividades';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Turno } from 'src/app/model/turno';
import { ActividadesService } from 'src/app/service/actividades.service';
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
  usuario: NuevoUsuario = null!;
  botonConf: boolean = false;
  noMostrarBtnBorrar: boolean = true;
  actividad: Actividades = null!;

  rol: any;
  usuarioLog: any;
  usuarioLogeado: any;

  constructor(private reservaServ: TurnoService, private activatedRoute: ActivatedRoute, private authServ: AuthService,
     private router: Router, private actividadServ: ActividadesService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.reservaServ.detail(id).subscribe(data => {this.detalleReserva = data});
    setTimeout(() => {this.loading = true}, 1200);
    
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

    async eliminar(id?: number): Promise<void> {
      if (id != null) {
        try {
          await firstValueFrom(this.reservaServ.delete(id));
          alert("✔ Registro eliminado correctamente");
          this.router.navigate(['admin']);
        } catch (err) {
          alert("No se pudo borrar el registro");
        }
      } else {
        alert("No se pudo borrar el registro");
      }
    }

    traerDatosUsuario() {
      if (this.detalleReserva && this.detalleReserva.nombreUsuario != null) {
        this.authServ.detailName(this.detalleReserva.nombreUsuario).subscribe(data => {
          this.usuario = data;
          // Realizar otras operaciones con this.usuario si es necesario
        });
      }
    }

  async guardar(): Promise<void> {
    try {
      if (this.usuario.id != null) {
        await firstValueFrom(this.authServ.update(Number(this.usuario.id), this.usuario));
        // Operación realizada con éxito
      }
    } catch (err) {
      alert("⛔ No se pudo realizar la acción ⛔");
      this.router.navigate(['admin']);
    }
  }

mostrarBotonConf(){
  this.botonConf = true;
  this.noMostrarBtnBorrar = false;
}

async guardarAct(): Promise<void> {
  try {
    if (this.detalleReserva.id_actividad != null) {
      await firstValueFrom(this.actividadServ.update(this.detalleReserva.id_actividad, this.actividad));
      // Operación realizada con éxito
    }
  } catch (err) {
    alert("⛔ No se pudo realizar la acción ⛔");
    this.router.navigate(['admin']);
  }
}

devolverCupo() {
  if (this.detalleReserva.id_actividad != null) {
    this.actividadServ.details(this.detalleReserva.id_actividad).subscribe(data => {
      this.actividad = data;

      // Verificar si this.actividad no es null o undefined antes de acceder a cupo
      if (this.actividad && this.actividad.cupo != null) {
        this.actividad.cupo++;
        this.guardarAct();
      } else {
        // Manejar el caso en el que this.actividad o this.actividad.cupo es null
        console.error('this.actividad o this.actividad.cupo es null o undefined');
      }
    });
  }
}

unificarFunciones(){
  this.devolverCupo();
  this.usuario.clasesTomadas --;
  this.usuario.suscripcionActual ++;
  this.guardar();
  this.eliminar(this.detalleReserva.id);
}

}
