import { Component, OnInit } from '@angular/core';
import { Actividades } from 'src/app/model/actividades';
import { ActividadesService } from 'src/app/service/actividades.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  actividades: Actividades[] = [];
  semana = [
    
    {
        nombre: 'lunes',
    },
    {
        nombre: 'martes',
    },
    {
        nombre: 'miércoles',
    },
    {
        nombre: 'jueves',
    },
    {
        nombre: 'viernes',
    },
    {
        nombre: 'sábado',
    },
];

  constructor(private actService: ActividadesService) { }

  ngOnInit(): void {
    this.traerActividades();
  }

  traerActividades(): void{
    this.actService.getActividades().subscribe(data => {this.actividades = data;})
  }

}
