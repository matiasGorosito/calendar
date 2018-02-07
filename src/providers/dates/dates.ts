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
    return this.pad(fecha.getUTCDate(),2,'0') +  '/' + this.pad(fecha.getUTCMonth()+1 ,2,'0') + '/' + fecha.getUTCFullYear();  
  }

  formatoHora(hora){
    return this.pad(hora.getUTCHours(),2,'0') + ':' + this.pad(hora.getUTCMinutes(),2,'0');
  }

  parse(fechaString){
    return new Date(Date.parse(fechaString));
  }
}
