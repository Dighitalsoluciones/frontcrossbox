import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { ActividadesService } from 'src/app/service/actividades.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  fecha: Date = null!;
  actividades: Actividades[] = [];
  

  constructor(private router: Router, private actividadesService: ActividadesService ) { }

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
        console.log(actividades);
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

}
