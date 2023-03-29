import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinnerdecarga',
  templateUrl: './spinnerdecarga.component.html',
  styleUrls: ['./spinnerdecarga.component.css']
})
export class SpinnerdecargaComponent implements OnInit {

  loading = true;
  cargando = false;

  constructor() { }

  ngOnInit(): void {
    /*agregado del spinner funcion de setTimeout 131 a 134*/ 
    setTimeout(() => {
      this.loading = false;
      this.cargando = true;
    }, 1200);
  }

}
