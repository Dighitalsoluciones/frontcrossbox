import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {

  usuariosRegistrados = false;

  constructor() { }

  ngOnInit(): void {
  }
   
  mostrarUsuariosRegistrados(){
    this.usuariosRegistrados = true;  
  }
}
