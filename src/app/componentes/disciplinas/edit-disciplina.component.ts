import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Disciplinas } from 'src/app/model/disciplinas';
import { AuthService } from 'src/app/service/auth.service';
import { DisciplinasService } from 'src/app/service/disciplinas.service';

const AUTHORITIES_KEY = 'AuthAuthorities';

@Component({
  selector: 'app-edit-disciplina',
  templateUrl: './edit-disciplina.component.html',
  styleUrls: ['./edit-disciplina.component.css']
})
export class EditDisciplinaComponent implements OnInit {
disciplinas: Disciplinas = null!;
loading: boolean = false;
selectedFile: File = null!;
imagen: string = '';
url: SafeUrl = "";

rol: any;
usuarioLog: any;
usuarioLogeado: any;

  constructor(private disciplinasServ: DisciplinasService, private activatedRoute: ActivatedRoute, private route: Router, private sanitizer: DomSanitizer, private authServ: AuthService) { }

  ngOnInit(): void {
    this.traerDisciplinas();
    const id = this.activatedRoute.snapshot.params['id'];
      this.disciplinasServ.detail(id).subscribe(
        data =>{
          this.disciplinas = data;
        }, err =>{
          alert("Error al modificar la actividad");
          this.route.navigate(['admin']);
        }
      )
      const authCodificado = sessionStorage.getItem(AUTHORITIES_KEY);
    this.rol = authCodificado ? JSON.stringify(atob(authCodificado)) : []; 
    this.traerUsuario(this.usuarioLogeado);  
  }

  traerDisciplinas(){
    this.disciplinasServ.lista().subscribe(data => {this.disciplinas});
  }

  traerUsuario(nombreUsuario: string): void{
    if(nombreUsuario != null){
    this.authServ.detailName(nombreUsuario).subscribe(data => {this.usuarioLog = data})
    }
  }

  isAdmin() {
    if(this.rol.includes("ROLE_ADMIN"))
      return true;
    else
      return false;
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
      
      this.disciplinas.imagen = base64.toString();
      console.log(base64);
      
    };
  }

  devolverImagen(){
    this.url = this.sanitizer.bypassSecurityTrustUrl(JSON.parse(this.disciplinas.imagen));
    return this.url;
    }

  onUpdate(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.disciplinasServ.update(id, this.disciplinas).subscribe(
      data => {alert("✅ Disciplina modificada correctamente");
        this.route.navigate(['admin']);
      }, err =>{
        alert("⛔ Error al modificar la disciplina ⛔");
        this.route.navigate(['admin']);
      }
    )
    
  }

  cancelar(): void {
    this.route.navigate(['admin']);
  }

 }
