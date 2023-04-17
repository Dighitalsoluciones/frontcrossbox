import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { ActividadesService } from 'src/app/service/actividades.service';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {
  @Input() fecha: Date = null!;
  actividades: Actividades[] = [];

  constructor(private router: Router, private actividadesService: ActividadesService) { }

  ngOnInit(): void {
    this.buscarActividades();
  }

  buscarActividades() {
    if (this.fecha) {
      this.actividadesService.buscarActividades(this.fecha)
        .subscribe(actividades => this.actividades = actividades);
    }
  }

  reservarActividad(actividad: Actividades) {
    this.actividadesService.reservarActividad(Number(actividad))
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

}
