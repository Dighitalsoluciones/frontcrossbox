import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';

const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-editarimagen',
  templateUrl: './editarimagen.component.html',
  styleUrls: ['./editarimagen.component.css']
})
export class EditarimagenComponent implements OnInit {

  usuario: NuevoUsuario = null!;
  usuarioLogeado: any;
  perfil: any;
  public imagenOk: any = [];
  public previsualizacion: string = "";
  
  files: any = []
  selectedFile: File = null!;
  url: SafeUrl = "";

  constructor(private auth: AuthService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const usuarioCodificado = sessionStorage.getItem(USERNAME_KEY);
    this.usuarioLogeado = usuarioCodificado ? JSON.parse(atob(usuarioCodificado)) : null;
      this.auth.detailName(this.usuarioLogeado).subscribe(
      data =>{
        this.usuario = data;
      }, err =>{
        alert("Error al modificar los datos del usuario");
        this.router.navigate(['perfil']);
      }
    )
  }

  obtenerUsuarioLogeado(){
    this.usuarioLogeado = sessionStorage.getItem(USERNAME_KEY);
      this.auth.detailName(this.usuarioLogeado).subscribe(
      data =>{
        this.usuario = data;
      }, err =>{
        alert("Error al modificar los datos del usuario");
        this.router.navigate(['perfil']);
      }
    )
  }

  onUpdate(): void{
    const id = Number(this.usuario.id);
    this.auth.updateimg(id, this.usuario).subscribe(
      data => {alert("✅ Imagen actualizada");
        this.router.navigate(['perfil']);
      }, err =>{
        alert("⛔ Error al modificar el articulo ⛔");
        this.router.navigate(['perfil']);
      }
    )
    
  }

  cancelar(): void {
    this.router.navigate(['perfil']);
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
      
      this.usuario.fotoPerfil = base64.toString();
      
    };
  }

  devolverImagen(){
this.url = this.sanitizer.bypassSecurityTrustUrl(JSON.parse(this.usuario.fotoPerfil));
return this.url;
}


}
