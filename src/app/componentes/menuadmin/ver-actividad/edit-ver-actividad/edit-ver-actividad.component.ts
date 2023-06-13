import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividades } from 'src/app/model/actividades';
import { Disciplinas } from 'src/app/model/disciplinas';
import { ActividadesService } from 'src/app/service/actividades.service';
import { AuthService } from 'src/app/service/auth.service';
import { DisciplinasService } from 'src/app/service/disciplinas.service';

const AUTHORITIES_KEY = 'AuthAuthorities';

@Component({
  selector: 'app-edit-ver-actividad',
  templateUrl: './edit-ver-actividad.component.html',
  styleUrls: ['./edit-ver-actividad.component.css']
})
export class EditVerActividadComponent implements OnInit {
actividad: Actividades = null!;
disciplinas: Disciplinas []= [];
loading: boolean = false;
rol: any;
usuarioLog: any;
usuarioLogeado: any;

  constructor(private actividadesServ: ActividadesService, private disciplinasServ: DisciplinasService, private activatedRoute: ActivatedRoute, private router: Router, private authServ: AuthService ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
    }, 1200);
    this.traerDisciplinas();
    const id = this.activatedRoute.snapshot.params['id'];
      this.actividadesServ.details(id).subscribe(
        data =>{
          this.actividad = data;
        }, err =>{
          alert("Error al modificar el turno");
          this.router.navigate(['admin']);
        }
      )
      const authCodificado = sessionStorage.getItem(AUTHORITIES_KEY);
      this.rol = authCodificado ? JSON.stringify(atob(authCodificado)) : []; 
      this.traerUsuario(this.usuarioLogeado);  
  }

  traerDisciplinas(){
    this.disciplinasServ.lista().subscribe(data => {this.disciplinas = data});
  }

  traerUsuario(nombreUsuario: string): void{
    this.authServ.detailName(nombreUsuario).subscribe(data => {this.usuarioLog = data})
    
  }

  isAdmin() {
    if(this.rol.includes("ROLE_ADMIN"))
      return true;
    else
      return false;
    }


  onUpdate(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.actividadesServ.update(id, this.actividad).subscribe(
      data => {alert("✅ Turno modificado correctamente");
        this.router.navigate(['admin']);
      }, err =>{
        alert("⛔ Error al modificar el turno ⛔");
        this.router.navigate(['admin']);
      }
    )
    
  }

  cancelar(): void {
    this.router.navigate(['admin']);
  }

  

}
