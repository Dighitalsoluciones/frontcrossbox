import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { Disciplinas } from 'src/app/model/disciplinas';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { ActividadesService } from 'src/app/service/actividades.service';
import { AuthService } from 'src/app/service/auth.service';
import { DisciplinasService } from 'src/app/service/disciplinas.service';

const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  fecha: Date | null = null;
  actividades: Actividades[] = [];
  today: string = new Date().toISOString().split('T')[0];
  actividadSeleccionada: string = "";
  usuarioLogeado: any;
  usuario: NuevoUsuario | null = null;
  disciplinas: Disciplinas[] = [];

  constructor(
    private router: Router,
    private actividadesService: ActividadesService,
    private auth: AuthService,
    private disciplinasServ: DisciplinasService
  ) { }

  ngOnInit(): void {
    this.traerDisciplinas();
    this.cargarUsuario();
  }

  traerDisciplinas(): void {
    this.disciplinasServ.lista().subscribe(
      data => {
        this.disciplinas = data;
      },
      error => {
        console.error('Error al cargar disciplinas:', error);
      }
    );
  }

  cargarUsuario(): void {
    const usuarioCodificado = sessionStorage.getItem(USERNAME_KEY);
    this.usuarioLogeado = usuarioCodificado ? JSON.parse(atob(usuarioCodificado)) : null;
    if (this.usuarioLogeado) {
      this.auth.detailName(this.usuarioLogeado).subscribe(
        data => {
          this.usuario = data;
        },
        error => {
          console.error('Error al cargar datos del usuario:', error);
          this.router.navigate(['perfil']);
        }
      );
    }
  }

  buscarActividades() {
    if (!this.fecha || !this.actividadSeleccionada) {
      alert('Por favor, seleccione una fecha y una actividad.');
      return;
    }

    this.actividadesService.buscarActividades(this.fecha).subscribe(
      (actividades: Actividades[]) => {
        this.actividades = actividades.filter(act => act.nombre === this.actividadSeleccionada);
      },
      (error: any) => {
        console.error('Error al buscar actividades:', error);
        alert('Hubo un error al buscar las actividades. Por favor, intente de nuevo.');
      }
    );
  }

  volver() {
    this.router.navigate(['perfil']);
  }

  mostrarTurno(): boolean {
    return this.usuario ? this.usuario.suscripcionActual > 0 : false;
  }

  mostrarSinSuscripcion(): boolean {
    return this.usuario ? this.usuario.suscripcionActual <= 0 : false;
  }
}