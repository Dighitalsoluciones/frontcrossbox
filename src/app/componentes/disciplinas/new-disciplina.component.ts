import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplinas } from 'src/app/model/disciplinas';
import { DisciplinasService } from 'src/app/service/disciplinas.service';

@Component({
  selector: 'app-new-disciplina',
  templateUrl: './new-disciplina.component.html',
  styleUrls: ['./new-disciplina.component.css']
})
export class NewDisciplinaComponent implements OnInit {

  id?: number;
  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  dia1: string = "Lunes";
  dia2: string = "Martes";
  dia3: string = "Miércoles";
  dia4: string = "Jueves";
  dia5: string = "Viernes";
  dia6: string = "Sábado";
  dia7: string = "Domingo";

  hs1: string = '';
  hs2: string = '';
  hs3: string = '';
  hs4: string = '';
  hs5: string = '';
  hs6: string = '';
  hs7: string = '';
  hs8: string = '';
  hs9: string = '';
  hs10: string = '';
  hs11: string = '';
  hs12: string = '';
  hs13: string = '';
  hs14: string = '';
  hs15: string = '';
  hs16: string = '';
  hs17: string = '';
  hs18: string = '';

  cupohs1: string = '';
  cupohs2: string = '';
  cupohs3: string = '';
  cupohs4: string = '';
  cupohs5: string = '';
  cupohs6: string = '';
  cupohs7: string = '';
  cupohs8: string = '';
  cupohs9: string = '';
  cupohs10: string = '';
  cupohs11: string = '';
  cupohs12: string = '';
  cupohs13: string = '';
  cupohs14: string = '';
  cupohs15: string = '';
  cupohs16: string = '';
  cupohs17: string = '';
  cupohs18: string = '';

  constructor(private disciplinasServ: DisciplinasService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreate(): void{
    const nuevaDisciplina = new Disciplinas(this.nombre, this.descripcion, this.imagen, this.dia1, this.dia2, this.dia3, this.dia4,
      this.dia5, this.dia6, this.dia7, this.hs1, this.hs2, this.hs3, this.hs4, this.hs5, this.hs6, this.hs7, this.hs8, this.hs9,
      this.hs10, this.hs11, this.hs12, this.hs13, this.hs14, this.hs15, this.hs16, this.hs17, this.hs18, this.cupohs1, this.cupohs2,
      this.cupohs3, this.cupohs4, this.cupohs5, this.cupohs6, this.cupohs7, this.cupohs8, this.cupohs9, this.cupohs10, this.cupohs11,
      this.cupohs12, this.cupohs13, this.cupohs14, this.cupohs15, this.cupohs16, this.cupohs17, this.cupohs18);
    this.disciplinasServ.save(nuevaDisciplina).subscribe(
      data=>{alert("✅ Disciplina creada correctamente");
      this.router.navigate(['']);
    }, err =>{
      alert(" de⛔Ya existe esa disciplina o debes completar todos los campos⛔");
      this.router.navigate(['']);
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['login']);
  }

}
