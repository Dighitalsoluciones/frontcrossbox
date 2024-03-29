import { Pipe, PipeTransform } from '@angular/core';
import { orderBy,sortBy } from 'lodash';

@Pipe({
  name: 'ordenarporHs'
})
export class OrdenarporHsPipe implements PipeTransform {

  transform(value: any[], order = '', column: string = ''): any[] {
    if (!value || order === '' || !order) { return value; } // no array
    if (!column || column === '') { 
      if(order==='asc'){return value.sort()}
      else{return value.sort().reverse();}
    } // sort 1d array
    if (value.length <= 1) { return value; } // array with only one item
    return orderBy(value, [column], [!order]);
  }
   }


