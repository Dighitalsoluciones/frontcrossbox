import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { Turno } from 'src/app/model/turno';
import { ActividadesService } from 'src/app/service/actividades.service';
import { AuthService } from 'src/app/service/auth.service';
import { TurnoService } from 'src/app/service/turno.service';

const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.component.html',
  styleUrls: ['./detalle-reserva.component.css']
})
export class DetalleReservaComponent implements OnInit {

  actividades : Actividades = null!;
  usuarioLogeado: any;
  perfil: any;

  constructor(private actiServ: ActividadesService, private activatedRouter: ActivatedRoute, private router: Router, private turnoServ: TurnoService,
   private auth: AuthService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.actiServ.details(id).subscribe(
      data =>{
        this.actividades = data;
      }, err =>{
        alert("Error al modificar la experiencia");
        this.router.navigate(['']);
      }
    )
    this.usuarioLogeado = sessionStorage.getItem(USERNAME_KEY);
    this.traerUsuario(this.usuarioLogeado);
    
    
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.actiServ.update(id, this.actividades).subscribe(
      data => {alert("✅ Articulo modificado correctamente");
        this.router.navigate(['reservar']);
      }, err =>{
        alert("⛔ Error al modificar el articulo ⛔");
        this.router.navigate(['reservar']);
      }
    )
    
  }

  cancelar(): void {
    this.router.navigate(['reservar']);
  }

  traerUsuario(nombreUsuario: string): void{
    this.auth.detailName(nombreUsuario).subscribe(data => {this.perfil = data})
      
    }


  crearReserva(): void{
    const nuevaReserva = new Turno(this.actividades.nombre, this.actividades.dia, this.actividades.horario, this.perfil.nombre, this.perfil.apellido, this.perfil.dni, this.perfil.telefono, this.perfil.fotoPerfil, this.perfil.nombreUsuario);
    this.turnoServ.save(nuevaReserva).subscribe(
      data=>{alert("✅ Reserva de la actividad creado correctamente");
      this.modificacionesUsuario();
    }, err =>{
      alert("⛔Error al intentar reservar, verifique el cupo⛔");
      this.router.navigate(['perfil']);
    }
    )
  }

  guardar(): void{
     this.auth.update(this.perfil.id, this.perfil).subscribe(
      data => {}, err =>{
        alert("⛔ Error al modificar el perfil ⛔");
        this.router.navigate(['reservar']);
      }
    )
    
  }

    reservarActividad(actividades: number) {
      this.actiServ.reservarActividad(Number(actividades))
        .subscribe(() => {
          ;
        });
    }

    modificacionesUsuario(){
      this.perfil.suscripcionActual --;
      this.perfil.clasesTomadas ++;
      this.guardar();
      this.reservarActividad(this.actividades.id!);
      this.router.navigate(['misreservas']);
      
    }

    recargar(){
      location.reload();
    }

}
