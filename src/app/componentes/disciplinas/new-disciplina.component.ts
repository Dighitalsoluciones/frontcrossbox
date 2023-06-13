import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplinas } from 'src/app/model/disciplinas';
import { AuthService } from 'src/app/service/auth.service';
import { DisciplinasService } from 'src/app/service/disciplinas.service';

const AUTHORITIES_KEY = 'AuthAuthorities';

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

  rol: any;
  usuarioLog: any;
  usuarioLogeado: any;

  constructor(private disciplinasServ: DisciplinasService, private router: Router, private authServ: AuthService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
    }, 1200);
    const authCodificado = sessionStorage.getItem(AUTHORITIES_KEY);
    this.rol = authCodificado ? JSON.stringify(atob(authCodificado)) : []; 
    this.traerUsuario(this.usuarioLogeado);  
  }

  traerUsuario(nombreUsuario: string): void{
    this.authServ.detailName(nombreUsuario).subscribe(data => {this.usuarioLog = data})
    
  }

  isAdmin() {
    if(this.rol.includes("ROLE_ADMIN"))
      return true;
    else
      return false;
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
