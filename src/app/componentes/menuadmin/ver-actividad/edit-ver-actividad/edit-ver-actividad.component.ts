import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { Disciplinas } from 'src/app/model/disciplinas';
import { ActividadesService } from 'src/app/service/actividades.service';
import { DisciplinasService } from 'src/app/service/disciplinas.service';

@Component({
  selector: 'app-edit-ver-actividad',
  templateUrl: './edit-ver-actividad.component.html',
  styleUrls: ['./edit-ver-actividad.component.css']
})
export class EditVerActividadComponent implements OnInit {
actividad: Actividades = null!;
disciplinas: Disciplinas []= [];
loading: boolean = false;

  constructor(private actividadesServ: ActividadesService, private disciplinasServ: DisciplinasService, private activatedRoute: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
    }, 1200);
    this.traerDisciplinas();
    const id = this.activatedRoute.snapshot.params['id'];
      this.actividadesServ.details(id).subscribe(
        data =>{
          this.actividad = data;
        }, err =>{
          alert("Error al modificar el turno");
          this.router.navigate(['admin']);
        }
      )
  }

  traerDisciplinas(){
    this.disciplinasServ.lista().subscribe(data => {this.disciplinas = data});
  }


  onUpdate(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.actividadesServ.update(id, this.actividad).subscribe(
      data => {alert("✅ Turno modificado correctamente");
        this.router.navigate(['admin']);
      }, err =>{
        alert("⛔ Error al modificar el turno ⛔");
        this.router.navigate(['admin']);
      }
    )
    
  }

  cancelar(): void {
    this.router.navigate(['admin']);
  }

  

}
