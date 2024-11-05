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

  usuario: NuevoUsuario | null = null;
  usuarioLogeado: string | null = null;
  previsualizacion: string = "";
  selectedFile: File | null = null;
  url: SafeUrl = "";
  imagenSeleccionada: boolean = false;

  constructor(private auth: AuthService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
  }

  obtenerUsuarioLogeado(): void {
    const usuarioCodificado = sessionStorage.getItem(USERNAME_KEY);
    this.usuarioLogeado = usuarioCodificado ? JSON.parse(atob(usuarioCodificado)) : null;
    if (this.usuarioLogeado) {
      this.auth.detailName(this.usuarioLogeado).subscribe(
        data => {
          this.usuario = data;
        },
        err => {
          console.error('Error al obtener los datos del usuario:', err);
          alert("Error al cargar los datos del usuario");
          this.router.navigate(['perfil']);
        }
      );
    }
  }

  onUpdate(): void {
    if (!this.usuario || !this.usuario.id) {
      console.error('No hay datos de usuario para actualizar');
      return;
    }

    this.auth.updateimg(this.usuario.id, this.usuario).subscribe(
      data => {
        alert("✅ Imagen actualizada correctamente");
        this.router.navigate(['perfil']);
      },
      err => {
        console.error('Error al actualizar la imagen:', err);
        alert("⛔ Error al modificar la imagen ⛔");
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['perfil']);
  }

  capturarImagen(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files[0]) {
      this.selectedFile = element.files[0];
      this.convertToBase64();

      if (element.files[0]) {
        this.imagenSeleccionada = true;
      } else {
        this.imagenSeleccionada = false;

      }

    }
  }

  convertToBase64(): void {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previsualizacion = e.target.result;
      if (this.usuario) {
        this.usuario.fotoPerfil = e.target.result;
      }
    };
    reader.readAsDataURL(this.selectedFile);
  }

  devolverImagen(): SafeUrl {
    if (this.usuario && this.usuario.fotoPerfil) {
      return this.sanitizer.bypassSecurityTrustUrl(this.usuario.fotoPerfil);
    }
    return '';
  }

}
