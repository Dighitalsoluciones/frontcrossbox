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
  profesor: string = '';
  loading = false;
  selectedFile: File = null!;

  constructor(private disciplinasServ: DisciplinasService, private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
    }, 1200);
  }

  onCreate(): void{
    const nuevaDisciplina = new Disciplinas(this.nombre, this.descripcion, this.imagen, this.profesor);
    this.disciplinasServ.save(nuevaDisciplina).subscribe(
      data=>{alert("✅ Disciplina creada correctamente");
      this.router.navigate(['admin']);
    }, err =>{
      alert(" de⛔Ya existe esa disciplina o debes completar todos los campos⛔");
      this.router.navigate(['admin']);
    }
    )
  }

  cancelar(): void {
    this.router.navigate(['admin']);
  }

  //captura el valor del input y muestra la vista previa de la imagen subida
  capturarImagen(event: any) {
    this.selectedFile = event.target.files[0];
    this.convertToBase64();
    
  }

  convertToBase64() {
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      const base64 = reader.result as string;
      // Aquí puedes enviar la imagen en formato base64 a la base de datos o hacer cualquier otra cosa con ella
      
      this.imagen = base64.toString();
      console.log(base64);
      
    };
  }

}
