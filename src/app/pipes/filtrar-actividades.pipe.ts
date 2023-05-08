import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarActividades'
})
export class FiltrarActividadesPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    const filtrarActividades = [];
    for(const Turno of value){
      if (Turno.nombre.toLowerCase().indexOf(arg) > -1){
        filtrarActividades.push(Turno)
      };
    };
    return filtrarActividades;
  }

}
