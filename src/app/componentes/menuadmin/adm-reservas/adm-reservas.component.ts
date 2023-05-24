import { formatDate } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplinas } from 'src/app/model/disciplinas';
import { Turno } from 'src/app/model/turno';
import { AuthService } from 'src/app/service/auth.service';
import { DisciplinasService } from 'src/app/service/disciplinas.service';
import { TurnoService } from 'src/app/service/turno.service';

@Component({
  selector: 'app-adm-reservas',
  templateUrl: './adm-reservas.component.html',
  styleUrls: ['./adm-reservas.component.css']
})
export class AdmReservasComponent implements OnInit {
  loading: boolean = false;
  reservas: Turno [] = []
  disciplinas: Disciplinas [] = []
  filtroActuales = [];
  buscarPorAct: any;
  actividadSeleccionada: String = "";
  FiltrarUsuariosReg = [];
  habilitarTodas: boolean = false;
  habilitarPorActividad: boolean = false;
  diasActuales: any;
  reservados: any;
  usuario: any;
  p: number = 1;

  constructor(private reservaServ: TurnoService, private disciplinaServ: DisciplinasService, private authServ: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.traerReservas();
    this.traerDisciplinas();

    setTimeout(() => {
      this.loading = true;
    }, 1200);

    const id = this.activatedRoute.snapshot.params['nombreUsuario'];
    this.reservaServ.detail(id).subscribe(data => {this.reservados = data});
  }

  traerReservas(){
    this.reservaServ.lista().subscribe(data => {this.reservas = data});
    
  }

  traerDisciplinas(){
    this.disciplinaServ.lista().subscribe(data => {this.disciplinas = data});
  }

  buscarPorActividad(){
    this.habilitarPorActividad = true;
    this.habilitarTodas = false;
    this.buscarPorAct = this.reservas.filter(filtrarRes => filtrarRes.actividad == this.actividadSeleccionada);
    this.filtroActuales = this.buscarPorAct;
    this.filtroActuales = this.buscarPorAct.filter((filtrardia: { dia: string; }) => filtrardia.dia >= formatDate(Date.now(), 'yyyy-MM-dd', 'es'));
    this.sortFiltroActualesByFechaYHorario();
    
  }


  verTodas(){
    this.habilitarPorActividad = false;
    this.habilitarTodas = true;
    this.actividadSeleccionada = "";
    this.diasActuales = this.reservas.filter((filtrardia: { dia: string; }) => filtrardia.dia >= formatDate(Date.now(), 'yyyy-MM-dd', 'es'));
    this.sortDiasActualesByFechaYHorario();
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.diasActuales();
}
pageChangeEventPorAct(event: number){
  this.p = event;
  this.filtroActuales;
}

/* UTILIZANDO FILTRO POR FECHA Y HORA
sortDiasActualesByFecha() {
  this.diasActuales.sort((a: { dia: string | number | Date; }, b: { dia: string | number | Date; }) => {
    const fechaA = new Date(a.dia);
    const fechaB = new Date(b.dia);
    return fechaA.getTime() - fechaB.getTime();
  });
}
*/

sortDiasActualesByFechaYHorario() {
  this.diasActuales.sort((a: {
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

sortFiltroActualesByFechaYHorario() {
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

/* UTILIZANDO FILTRO POR FECHA Y HORA
sortFiltroActualesByFecha() {
  this.filtroActuales.sort((a: { dia: string | number | Date; }, b: { dia: string | number | Date; }) => {
    const fechaA = new Date(a.dia);
    const fechaB = new Date(b.dia);
    return fechaA.getTime() - fechaB.getTime();
  });
}
*/


}
