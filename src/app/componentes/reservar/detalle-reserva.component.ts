import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { Turno } from 'src/app/model/turno';
import { ActividadesService } from 'src/app/service/actividades.service';
import { AuthService } from 'src/app/service/auth.service';
import { TurnoService } from 'src/app/service/turno.service';

const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.component.html',
  styleUrls: ['./detalle-reserva.component.css']
})
export class DetalleReservaComponent implements OnInit {
  actividades: Actividades | null = null;
  usuarioLogeado: any;
  perfil: any;
  rol: any;

  constructor(
    private actiServ: ActividadesService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private turnoServ: TurnoService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarActividad();
    this.cargarUsuario();
  }

  cargarActividad(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.actiServ.details(id).subscribe(
      data => {
        this.actividades = data;
      },
      err => {
        console.error('Error al cargar los detalles de la actividad:', err);
        this.router.navigate(['']);
      }
    );
  }

  cargarUsuario(): void {
    const usuarioCodificado = sessionStorage.getItem(USERNAME_KEY);
    this.usuarioLogeado = usuarioCodificado ? JSON.parse(atob(usuarioCodificado)) : null;

    if (this.usuarioLogeado) {
      this.traerUsuario(this.usuarioLogeado);
    }

    const authCodificado = sessionStorage.getItem(AUTHORITIES_KEY);
    this.rol = authCodificado ? JSON.parse(atob(authCodificado)) : [];
  }

  traerUsuario(nombreUsuario: string): void {
    if (nombreUsuario != null) {
      this.auth.detailName(nombreUsuario).subscribe(
        data => {
          this.perfil = data;
        },
        err => {
          console.error('Error al cargar los detalles del usuario:', err);
        }
      );
    }
  }

  isAdmin(): boolean {
    return this.rol.includes("ROLE_ADMIN");
  }

  crearReserva(): void {
    if (!this.actividades || !this.perfil) {
      console.error('Datos de actividad o perfil no disponibles');
      return;
    }

    const nuevaReserva = new Turno(
      this.actividades.nombre,
      this.actividades.dia,
      this.actividades.horario,
      this.perfil.nombre,
      this.perfil.apellido,
      this.perfil.dni,
      this.perfil.telefono,
      this.perfil.nombreUsuario,
      Number(this.actividades.id)
    );

    this.turnoServ.save(nuevaReserva).subscribe(
      data => {
        this.modificacionesUsuario();
      },
      err => {
        console.error('Error al intentar reservar:', err);
        alert("Error al intentar reservar. Por favor, verifique el cupo.");
        this.router.navigate(['perfil']);
      }
    );
  }

  modificacionesUsuario(): void {
    if (!this.perfil || !this.actividades) return;

    this.perfil.suscripcionActual--;
    this.perfil.clasesTomadas++;

    this.auth.update(this.perfil.id, this.perfil).subscribe(
      () => {
        this.reservarActividad(this.actividades!.id!);
        this.router.navigate(['misreservas']);
      },
      err => {
        console.error('Error al modificar el perfil:', err);
        alert("Error al actualizar el perfil. Por favor, inténtalo de nuevo.");
      }
    );
  }

  reservarActividad(actividadId: number): void {
    this.actiServ.reservarActividad(actividadId).subscribe(
      () => { },
      err => {
        console.error('Error al reservar la actividad:', err);
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['reservar']);
  }

  recargar(): void {
    location.reload();
  }
}