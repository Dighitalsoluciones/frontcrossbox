import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/model/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-carga-suscripcion',
  templateUrl: './carga-suscripcion.component.html',
  styleUrls: ['./carga-suscripcion.component.css']
})
export class CargaSuscripcionComponent implements OnInit {

  usuario: NuevoUsuario = null!;

  constructor(private authServ: AuthService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.authServ.details(id).subscribe(
      data =>{
        this.usuario = data;
      }, err =>{
        alert("Error al cargar la suscripcion");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void{
    const id = this.activatedRouter.snapshot.params['id'];
    this.authServ.update(id, this.usuario).subscribe(
      data => {alert("✅ Articulo modificado correctamente");
        this.router.navigate(['']);
      }, err =>{
        alert("⛔ Error al modificar el usuario ⛔");
        this.router.navigate(['']);
      }
    )
    
  }

  cancelar(): void {
    this.router.navigate(['']);
  }

  enviarWhatsapp(){
    document.location.href ='https://wa.me/549'+ this.usuario.telefono;
  }

}
