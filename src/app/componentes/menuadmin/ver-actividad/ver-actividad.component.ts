import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Actividades } from 'src/app/model/actividades';
import { Disciplinas } from 'src/app/model/disciplinas';
import { ActividadesService } from 'src/app/service/actividades.service';
import { DisciplinasService } from 'src/app/service/disciplinas.service';

@Component({
  selector: 'app-ver-actividad',
  templateUrl: './ver-actividad.component.html',
  styleUrls: ['./ver-actividad.component.css']
})
export class VerActividadComponent implements OnInit {

  actividades: Actividades [] = [];
  disciplinas: Disciplinas [] = [];
  loading: boolean = false;
  actividadSeleccionada: string = "";
  buscarPorAct: any;
  filtroActuales= [];
  p: number = 1;

  constructor(private actividadesServ: ActividadesService, private disciplinaServ: DisciplinasService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
    }, 1200);
    this.traerActividades();
    this.traerDisciplinas();
  }

  traerActividades(){
    this.actividadesServ.getActividades().subscribe(data => {this.actividades = data});
  }

  traerDisciplinas(){
    this.disciplinaServ.lista().subscribe(data => {this.disciplinas = data});
  }

  buscarPorActividad(){
    this.buscarPorAct = this.actividades.filter(filtrarAct => filtrarAct.nombre == this.actividadSeleccionada);
    this.filtroActuales = this.buscarPorAct;
    this.filtroActuales = this.buscarPorAct.filter((filtrardia: { dia: string; }) => filtrardia.dia >= formatDate(Date.now(), 'yyyy-MM-dd', 'es'));
    this.sortDiasActualesByFechaYHorario();
  }

  eliminar(id?: number){
    if(id != undefined){
      this.actividadesServ.delete(id).subscribe(data =>{alert("Registro eliminado correctamente");
      this.traerActividades();
      location.reload();
      },err =>{alert("No se pudo borrar el registro")},
       )
       }else{
        alert("No se pudo borrar el registro")
       }
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.filtroActuales;
}

sortDiasActualesByFechaYHorario() {
  this.filtroActuales.sort((a: {
    horario: any; dia: string | number | Date; 
}, b: {
    horario: any; dia: string | number | Date; 
}) => {
    const fechaA = new Date(a.dia);
    const fechaB = new Date(b.dia);

    // Ordenar por fecha
    if (fechaA < fechaB) {
      return -1;
    }
    if (fechaA > fechaB) {
      return 1;
    }

    // Si las fechas son iguales, ordenar por horario
    const horaA = a.horario;
    const horaB = b.horario;
    if (horaA < horaB) {
      return -1;
    }
    if (horaA > horaB) {
      return 1;
    }

    return 0; // Si las fechas y los horarios son iguales
  });
}

}
