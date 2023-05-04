import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { Turno } from 'src/app/model/turno';
import { ActividadesService } from 'src/app/service/actividades.service';
import { TurnoService } from 'src/app/service/turno.service';

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

  //Crear Turno
  actividad: string = "";
  dia: string = "";
  horario: string = "";
  nombre: string = "Pico";
  apellido: string = "Palta";
  dni: string = "35639824";
  telefono: string = "1111";
  fotoPerfil: string = "d";
  nombreUsuario: string = "cach";
  

  constructor(private router: Router, private actividadesService: ActividadesService, private turnoServ: TurnoService) { }

  ngOnInit(): void {
    this.traerActividades();
  }

  traerActividades(): void{
    this.actividadesService.getActividades().subscribe(data => {this.actividades = data;})
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

  onCreate(): void{
    const nuevaReserva = new Turno(this.actividad, this.dia, this.horario, this.nombre, this.apellido, this.dni, this.telefono, this.fotoPerfil, this.nombreUsuario);
    this.turnoServ.save(nuevaReserva).subscribe(
      data=>{alert("✅ Reserva de la actividad creado correctamente");
      this.router.navigate(['admin']);
    }, err =>{
      alert("⛔Ya existe este Turno o debes completar todos los campos⛔");
      this.router.navigate(['admin']);
    }
    )
  }

}
