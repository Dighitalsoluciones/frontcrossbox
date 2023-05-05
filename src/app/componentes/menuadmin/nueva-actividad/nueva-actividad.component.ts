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
  loading = false;
  

  constructor(private actividadesServ: ActividadesService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
    }, 1200);
  }
  

  onCreate(): void{
    
    const nuevaActividad = new Actividades(this.nombre, this.descripcion, this.dia, this.horario, this.cupos);
    this.actividadesServ.save(nuevaActividad).subscribe(
      data=>{alert("✅ Turno de la actividad creado correctamente");
      this.router.navigate(['admin']);
    }, err =>{
      alert("⛔Ya existe este Turno o debes completar todos los campos⛔");
      this.router.navigate(['admin']);
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['']);
  }

}
