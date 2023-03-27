import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrarUsuarios'
})
export class FiltrarUsuariosPipe implements PipeTransform {

  transform(value: any, arg: any[]): any {
    const filtrarUsuarios = [];
    for(const Usuarios of value){
      if (Usuarios.apellido.toLowerCase().indexOf(arg) > -1){
        filtrarUsuarios.push(Usuarios)
      };
    };
    return filtrarUsuarios;
  }

}
