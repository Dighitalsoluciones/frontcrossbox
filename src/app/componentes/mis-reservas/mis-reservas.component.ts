import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/model/turno';
import { TurnoService } from 'src/app/service/turno.service';

const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {
  reservas: Turno [] = [];
  usuarioLogeado = USERNAME_KEY

  constructor(private turnoService: TurnoService) { }

  ngOnInit(): void {
    this.TraerReservas();
    this.reservasDelUsuario();
  }

  TraerReservas(){
    this.turnoService.lista().subscribe(data => {this.reservas = data});
  }

  reservasDelUsuario(){
    this.reservas = this.reservas.filter(reserva => reserva.nombreUsuario = this.usuarioLogeado)
  }
}
