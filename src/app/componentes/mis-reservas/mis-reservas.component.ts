import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turno } from 'src/app/model/turno';
import { SpinnerService } from 'src/app/service/spinner.service';
import { TurnoService } from 'src/app/service/turno.service';

const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {
  reservas: Turno[] = [];
  usuarioLogeado: string | null = null;
  misReservas: Turno[] = [];
  reservasDeHoy: Turno[] = [];

  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private spinnerService: SpinnerService
  ) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.traerReservas();
  }

  cargarUsuario(): void {
    const usuarioCodificado = sessionStorage.getItem(USERNAME_KEY);
    this.usuarioLogeado = usuarioCodificado ? JSON.parse(atob(usuarioCodificado)) : null;
  }

  traerReservas(): void {
    this.spinnerService.llamarSpinner();
    this.turnoService.lista().subscribe(
      data => {
        this.reservas = data;
        this.filtrarReservasUsuario();
        this.spinnerService.pararSpinner();
      },
      err => {
        console.error('Error al cargar las reservas:', err);
        alert("No se pudieron traer las reservas del usuario, intente nuevamente");
        this.spinnerService.pararSpinner();
      }
    );
  }

  filtrarReservasUsuario(): void {
    if (this.usuarioLogeado) {
      this.misReservas = this.reservas.filter(reserva => reserva.nombreUsuario === this.usuarioLogeado);
      const hoy = formatDate(new Date(), 'yyyy-MM-dd', 'es');
      this.reservasDeHoy = this.misReservas.filter(reserva => reserva.dia >= hoy);
    }
  }

  volver(): void {
    this.router.navigate(['perfil']);
  }

  eliminar(id?: number): void {
    if (id !== undefined) {
      this.spinnerService.llamarSpinner();
      this.turnoService.delete(id).subscribe(
        () => {
          alert("Reserva cancelada correctamente");
          this.traerReservas();
        },
        err => {
          console.error('Error al cancelar la reserva:', err);
          alert("No se pudo cancelar la reserva");
          this.spinnerService.pararSpinner();
        }
      );
    }
  }
}