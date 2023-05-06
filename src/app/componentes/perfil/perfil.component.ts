import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

const USERNAME_KEY = 'AuthUsername';
const FOTOPERFIL = 'image';

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
    this.usuarioLogeado = sessionStorage.getItem(USERNAME_KEY);
    this.traerUsuario(this.usuarioLogeado);
    this.mostrarfoto = localStorage.getItem(FOTOPERFIL);
  }

  traerUsuario(nombreUsuario: string): void{
  this.auth.detailName(nombreUsuario).subscribe(data => {this.perfil = data})
    
  }


}
