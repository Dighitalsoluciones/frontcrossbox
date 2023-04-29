import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { ActividadesService } from 'src/app/service/actividades.service';

@Component({
  selector: 'app-nueva-actividad',
  templateUrl: './nueva-actividad.component.html',
  styleUrls: ['./nueva-actividad.component.css']
})
export class NuevaActividadComponent implements OnInit {

  nombre: string = "";
  descripcion: string = "";
  dia: string = "";
  horario: string = "";
  cupos: number = 0;
  

  constructor(private actividadesServ: ActividadesService, private router: Router) { }

  ngOnInit(): void {
  }
  

  onCreate(): void{
    
    const nuevaActividad = new Actividades(this.nombre, this.descripcion, this.dia, this.horario, this.cupos);
    this.actividadesServ.save(nuevaActividad).subscribe(
      data=>{alert("✅ Turno de la actividad creada correctamente");
      this.router.navigate(['']);
    }, err =>{
      alert("⛔Ya existe este Turno o debes completar todos los campos⛔");
      this.router.navigate(['']);
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['']);
  }

}
