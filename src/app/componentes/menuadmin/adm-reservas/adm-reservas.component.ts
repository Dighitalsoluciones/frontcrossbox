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
    
  }


  verTodas(){
    this.habilitarPorActividad = false;
    this.habilitarTodas = true;
    this.actividadSeleccionada = "";
    this.diasActuales = this.reservas.filter((filtrardia: { dia: string; }) => filtrardia.dia >= formatDate(Date.now(), 'yyyy-MM-dd', 'es'));
  }


}
