import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { ActividadesService } from 'src/app/service/actividades.service';

@Component({
  selector: 'app-detalle-reserva',
  templateUrl: './detalle-reserva.component.html',
  styleUrls: ['./detalle-reserva.component.css']
})
export class DetalleReservaComponent implements OnInit {

  actividades : Actividades = null!;

  constructor(private actiServ: ActividadesService, private activatedRouter: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.actiServ.details(id).subscribe(
      data =>{
        this.actividades = data;
      }, err =>{
        alert("Error al modificar la experiencia");
        this.router.navigate(['menuarticulos']);
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.actiServ.updateActividad(id).subscribe(
      data => {alert("✅ Articulo modificado correctamente");
        this.router.navigate(['menuarticulos']);
      }, err =>{
        alert("⛔ Error al modificar el articulo ⛔");
        this.router.navigate(['menuarticulos']);
      }
    )
    
  }

  cancelar(): void {
    this.router.navigate(['menuarticulos']);
  }


}
