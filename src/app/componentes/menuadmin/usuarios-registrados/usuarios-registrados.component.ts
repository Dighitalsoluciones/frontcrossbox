import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/model/usuarios';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-usuarios-registrados',
  templateUrl: './usuarios-registrados.component.html',
  styleUrls: ['./usuarios-registrados.component.css']
})
export class UsuariosRegistradosComponent implements OnInit {

  usuariosRegistrados: Usuarios[] = [];
  FiltrarUsuariosReg = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.listaUsuarios();
  }

  listaUsuarios(): void{
    this.authService.lista().subscribe(data => {this.usuariosRegistrados = data;})
  }
}
