import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarioLogeado: any;
  perfil: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private tokenService: TokenService, private auth: AuthService) { }

  ngOnInit(): void {
    this.usuarioLogeado = sessionStorage.getItem(USERNAME_KEY);
    this.traerUsuario(this.usuarioLogeado);
  }

  traerUsuario(nombreUsuario: string): void{
  this.auth.detailName(nombreUsuario).subscribe(data => {this.perfil = data})
    
  }

}
