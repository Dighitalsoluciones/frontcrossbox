import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { Disciplinas } from 'src/app/model/disciplinas';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { Turno } from 'src/app/model/turno';
import { ActividadesService } from 'src/app/service/actividades.service';
import { AuthService } from 'src/app/service/auth.service';
import { DisciplinasService } from 'src/app/service/disciplinas.service';
import { TurnoService } from 'src/app/service/turno.service';

const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  selecActividad: string[] = ["CROSSBOX", "FUNCIONAL", "GAP"];
  fecha: Date = null!;
  actividades: Actividades[] = [];
  today: string = new Date().toISOString().split('T')[0];
  actividadSeleccionada: string = "";
  usuarioLogeado: any;
  usuario: NuevoUsuario = null!;
  disciplinas: Disciplinas [] = [];

  constructor(private router: Router, private actividadesService: ActividadesService, private turnoServ: TurnoService, private auth: AuthService, private disciplinasServ: DisciplinasService) { }

  ngOnInit(): void {
    this.traerDisciplinas();
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

  traerActividades(): void{
    this.actividadesService.getActividades().subscribe(data => {this.actividades = data});
  }

  traerDisciplinas(): void{
    this.disciplinasServ.lista().subscribe(data => {this.disciplinas = data});
  }

  buscarActividades() {
    this.actividadesService.buscarActividades(this.fecha).subscribe(
      (actividades: Actividades[]) => {
        this.actividades = actividades;
        this.actividades = this.actividades.filter(filtact => filtact.nombre == this.actividadSeleccionada);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  verDetalle(id: number) {
    this.router.navigate(['/actividades', id]);
  }

  reservarActividad(actividades: number) {
    this.actividadesService.reservarActividad(Number(actividades))
      .subscribe(() => {
        alert('La actividad se reservó correctamente');
        this.buscarActividades();
        
      });
  }

  cancelarReservaActividad(actividad: Actividades) {
    this.actividadesService.reservarActividad(Number(actividad))
      .subscribe(() => {
        alert('La reserva de la actividad fue cancelada');
        this.buscarActividades();
      });
  }

 
  volver(){
    this.router.navigate(['perfil']);
  }

  mostrarTurno(){
    if(this.usuario.suscripcionActual != 0){
     return true;
    }
    return false;
  }

}
