import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';

const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent implements OnInit {
  
  usuario: NuevoUsuario = null!;
  usuarioLogeado: any;
  perfil: any;
  public imagenOk: any = [];
  public previsualizacion: string = "";
  imagenPrevia: any;
  files: any = []
  

  constructor(private auth: AuthService, private activatedRouter: ActivatedRoute, 
    private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
    this.auth.update(id, this.usuario).subscribe(
      data => {alert("✅ Perfil actualizado");
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
    const imagen = event.target.files[0];
    const image: any = document.getElementById('output');
    image.src = URL.createObjectURL(imagen);
    console.log(imagen);
    
  }


subirImagen = () => {
  const id = Number(this.usuario.id);
  try {
    const formData = new FormData();
    this.files.forEach((item: any) => {
      formData.append('files', item)
    });
    this.auth.update(id, this.usuario)
      .subscribe(res => {
        
        console.log('Carga exitosa');


      });
  } catch (e) {
    console.log('ERROR', e);

  }
}

  /* No funciona esto era para convertir a base64
  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };

    } catch (e) {
      
    }
  }) 

}
*/
}
