import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

const USERNAME_KEY = 'AuthUsername';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarioLogeado: any;
  perfil: any;
  mostrarfoto: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    const usuarioCodificado = sessionStorage.getItem(USERNAME_KEY);
    this.usuarioLogeado = usuarioCodificado ? JSON.parse(atob(usuarioCodificado)) : null;
    this.traerUsuario(this.usuarioLogeado);
   
  }

  traerUsuario(nombreUsuario: string): void{
  this.auth.detailName(nombreUsuario).subscribe(data => {this.perfil = data})
    
  }


}
