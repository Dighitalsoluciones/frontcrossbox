import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplinas } from 'src/app/model/disciplinas';
import { DisciplinasService } from 'src/app/service/disciplinas.service';


@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {
disciplinas: Disciplinas [] = [];
loading = false; 

  constructor(private disciplinaServ: DisciplinasService, private router: Router) { }

  ngOnInit(): void {
    this.traerDisciplinas();
    setTimeout(() => {
      this.loading = true;
    }, 1200);
}

traerDisciplinas(){
  this.disciplinaServ.lista().subscribe(data => {this.disciplinas = data});
}

eliminar(id?: number){
  if(id != undefined){
  this.disciplinaServ.delete(id).subscribe(data =>{alert("Registro eliminado correctamente");
this.traerDisciplinas();
},err =>{alert("No se pudo borrar el registro")},
 )
 }else{
  alert("No se pudo borrar el registro")
 }
}
}


