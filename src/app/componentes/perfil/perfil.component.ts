import { Component, Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

const USERNAME_KEY = 'AuthUsername';

@Injectable({ providedIn: 'root' })
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate() {
    if (!this.tokenService.getToken()) {
      console.log("No estás logueado");
      this.router.navigate(["/"]);
      return false;
    }
    return true;
  }
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarioLogeado: string | null = null;
  perfil: any;
  isLoading = true;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    const usuarioCodificado = sessionStorage.getItem(USERNAME_KEY);
    this.usuarioLogeado = usuarioCodificado ? JSON.parse(atob(usuarioCodificado)) : null;
    if (this.usuarioLogeado) {
      this.traerUsuario(this.usuarioLogeado);
    }
  }

  traerUsuario(nombreUsuario: string): void {
    this.isLoading = true;
    this.auth.detailName(nombreUsuario).subscribe(
      data => {
        this.perfil = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error al traer los detalles del usuario verifica la conexión a internet:', error);
        this.isLoading = false;
      }
    );
  }
}