import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Turno } from 'src/app/model/turno';
import { TurnoService } from 'src/app/service/turno.service';

@Component({
  selector: 'app-detail-adm-reservas',
  templateUrl: './detail-adm-reservas.component.html',
  styleUrls: ['./detail-adm-reservas.component.css']
})
export class DetailAdmReservasComponent implements OnInit {
  detalleReserva: Turno = null!
  loading: boolean = false;

  constructor(private reservaServ: TurnoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.reservaServ.detail(id).subscribe(data => {this.detalleReserva = data});

    setTimeout(() => {this.loading = true}, 1200);
  }



}
