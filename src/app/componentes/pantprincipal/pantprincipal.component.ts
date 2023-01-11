import { HttpClient } from '@angular/common/http';
import { Component, getNgModuleById, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-pantprincipal',
  templateUrl: './pantprincipal.component.html',
  styleUrls: ['./pantprincipal.component.css']
})
export class PantprincipalComponent implements OnInit {
  isLogged = false;
  usuario: any;
  userId: any;
  id1: any;
  

  constructor(private http: HttpClient, private router:Router, private route: ActivatedRoute, private tokenService: TokenService, private auth: AuthService) { }

  ngOnInit(): void {
  
    this.userId = this.route.snapshot.paramMap.get('id');
    
    this.traerUsuario(3);  
    console.log(this.userId);
      
    if(this.tokenService.getToken()){
      this.isLogged= true;
    }else{
      this.isLogged = false;
    }
  }

  onLogout(): void{
    this.tokenService.logOut();
    window.location.reload();
  }

  login(){
    this.router.navigate(['/login'])
  }

 
  traerUsuario(id:number): void{
    this.auth.getUsuario(id).subscribe(data => {this.usuario = data})
    
  }

  idUsuario(){
    this.id1 = this.usuario.id;
  }


  traerId(){
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log(this.userId)
      return this.userId ;
  });
  
  }
}

