import { Injectable } from '@angular/core';

/*
  Generated class for the DatesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatesProvider {

  constructor() {
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  formatoFecha(fecha){
    console.log('--------');
    console.log(fecha.getDate());
    console.log(fecha);
    console.log('--------');
    return this.pad(fecha.getDate(),2,'0') +  '/' + this.pad(fecha.getMonth()+1 ,2,'0') + '/' + fecha.getFullYear();  
  }

  formatoHora(hora){
    return this.pad(hora.getHours(),2,'0') + ':' + this.pad(hora.getMinutes(),2,'0');
  }

  parse(fechaString){
    return new Date(Date.parse(fechaString));
  }
}
