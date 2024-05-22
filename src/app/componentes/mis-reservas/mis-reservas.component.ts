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
  usuarioLogeado: any;
  misReservas: any;
  reservasDeHoy: any;

  constructor(private turnoService: TurnoService, private router: Router, private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.TraerReservas();
    const usuarioCodificado = sessionStorage.getItem(USERNAME_KEY);
    this.usuarioLogeado = usuarioCodificado ? JSON.parse(atob(usuarioCodificado)) : null;
  }

  TraerReservas() {
    this.spinnerService.llamarSpinner();
    this.turnoService.lista().subscribe(data => {
      this.reservas = data;
      this.reservasDelUsuario();
      this.spinnerService.pararSpinner();
    }, err => {
      alert("No se pudieron traer las reservas del usuario, intente nuevamente");
      this.spinnerService.pararSpinner();
    });
  }

  reservasDelUsuario() {
    this.misReservas = this.reservas.filter(reserva => reserva.nombreUsuario == this.usuarioLogeado);
    this.reservasDeHoy = this.misReservas.filter((reserva: { dia: string; }) => reserva.dia >= formatDate(Date.now(), 'yyyy-MM-dd', 'es'));
  }

  volver() {
    this.router.navigate(['perfil']);
  }

  eliminar(id?: number) {
    if (id != undefined) {
      this.turnoService.delete(id).subscribe(data => {
        alert("Registro eliminado correctamente");
        this.reservasDelUsuario();
      }, err => { alert("No se pudo borrar el registro") },
      )
    } else {
      alert("No se pudo borrar el registro")
    }
  }


}
