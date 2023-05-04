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
  actividades2: Actividades[] = [];

  constructor(private actiServ: ActividadesService, private activatedRouter: ActivatedRoute, private router: Router, private turnoServ: TurnoService,
   private auth: AuthService) { }

  ngOnInit(): void {
    this.usuarioLogeado = sessionStorage.getItem(USERNAME_KEY);
    this.traerUsuario(this.usuarioLogeado);
    this.traerActividades();

    const id = this.activatedRouter.snapshot.params['id'];
    this.actiServ.details(id).subscribe(
      data =>{
        this.actividades = data;
      }, err =>{
        alert("Error al modificar la experiencia");
        this.router.navigate(['menuarticulos']);
      }
    )
    
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.actiServ.updateActividad(id).subscribe(
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

  traerActividades(): void{
    this.actiServ.getActividades().subscribe(data => {this.actividades2 = data;})
  }

  traerUsuario(nombreUsuario: string): void{
    this.auth.detailName(nombreUsuario).subscribe(data => {this.perfil = data})
      
    }

//Crear Turno
actividada: string = "";
diaa: string = "";
horarioa: string = "";
nombre: string = "pe";
apellido: string = "pi";
dni: string = "34";
telefono: string = "34";
fotoPerfil: string = "";
nombreUsuario: string = "po";    

     

  crearReserva(): void{
    const nuevaReserva = new Turno(this.actividada, this.diaa, this.horarioa, this.nombre, this.apellido, this.dni, this.telefono, this.fotoPerfil, this.nombreUsuario);
    this.turnoServ.save(nuevaReserva).subscribe(
      data=>{alert("✅ Reserva de la actividad creado correctamente");
      this.router.navigate(['reservar']);
    }, err =>{
      alert("⛔Ya existe este Turno o debes completar todos los campos⛔");
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


}
