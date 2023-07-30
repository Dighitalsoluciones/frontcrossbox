import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { Disciplinas } from 'src/app/model/disciplinas';
import { ActividadesService } from 'src/app/service/actividades.service';
import { DisciplinasService } from 'src/app/service/disciplinas.service';

@Component({
  selector: 'app-nueva-actividad',
  templateUrl: './nueva-actividad.component.html',
  styleUrls: ['./nueva-actividad.component.css']
})
export class NuevaActividadComponent implements OnInit {
  disciplinas: Disciplinas [] = [];
  nombre: string = "";
  descripcion: string = "";
  dia: string = "";
  horario: string = "";
  cupos: number = 0;
  loading = false;
  
  

  constructor(private actividadesServ: ActividadesService, private disciplinasServ: DisciplinasService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
    }, 1200);
    this.traerDisciplinas();
  }
  

  onCreate(): void{
    const nuevaActividad = new Actividades(this.nombre, this.descripcion, this.dia, this.horario, this.cupos);
    this.actividadesServ.save(nuevaActividad).subscribe(
      data=>{alert("✅ Turno de la actividad creado correctamente");
      //this.router.navigate(['admin']); comentado para evitar que redireccione a pantalla admin y hacer mas rapida la creacion
    }, err =>{
      alert("⛔Ya existe este Turno o debes completar todos los campos⛔");
      this.router.navigate(['admin']);
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['admin']);
  }

  traerDisciplinas(){
    this.disciplinasServ.lista().subscribe(data => {this.disciplinas = data});
  }

}
