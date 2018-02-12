import { Injectable } from '@angular/core';

/*
  Generated class for the DatesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatesProvider {
  namesOfDays;
  namesOfMonths;
  daysInWeek = 7;

  constructor() {
    
    this.namesOfDays = [
      {
        name: 'lun',
        position: 1
      },
      {
        name: 'mar',
        position: 2
      },
      {
        name: 'mié',
        position: 3
      },
      {
        name: 'jue',
        position: 4
      },
      {
        name: 'vie',
        position: 5
      },
      {
        name: 'sáb',
        position: 6
      },
      {
        name: 'dom',
        position: 0
      },
    ];

    this.namesOfMonths = [
      {
        name: 'Enero',
        number: 0
      },
      {
        name: 'Febrero',
        number: 1
      },
      {
        name: 'Marzo',
        number: 2
      },
      {
        name: 'Abril',
        number: 3
      },
      {
        name: 'Mayo',
        number: 4
      },
      {
        name: 'Junio',
        number: 5
      },
      {
        name: 'Julio',
        number: 6
      },
      {
        name: 'Agosto',
        number: 7
      },
      {
        name: 'Septiembre',
        number: 8
      },
      {
        name: 'Octubre',
        number: 9
      },
      {
        name: 'Noviembre',
        number: 10
      },
      {
        name: 'Diciembre',
        number: 11
      },
    ];    
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
  
  setFullDay(date){
    let r = this.parse(date);
    r.setUTCHours(0);
    r.setUTCMinutes(0);
    r.setUTCSeconds(0)
    r.setUTCMilliseconds(0);
    return r;
  }

  addHoursToDate(date,h){
    let aux = date.getHours();
    let res;
    if(h+aux > 23){
      res = h+aux - 23;
    }
    else{
      res = h+aux;
    }
    date.setHours(res);
    return date;
  }
  
  getNamesOfDays(){
    return this.namesOfDays;
  }

  getNamesOfMonths(){
    return this.namesOfMonths;
  }

  emptyWeek(){
    return {
      id:null,
      days:[]
    }
  }

  emptyDay(){
    return {
      position: null,
      number: null,
      name: null,
      events: []
    }
  }

  emptyMonth(){
    return {
      number: null,
      year: null,
      name: null,
      weeks: []
    }
  }

  getDayData(n){
    return this.getNamesOfDays().find(d => d.number == n);
  }

  getMonthData(n){
    return this.getNamesOfMonths().find(m => m.number == n);
  }

  getWeek(id,firstDay,lastDay,position){
    let auxWeek = this.emptyWeek();
    auxWeek.id = id;
    for(var i = firstDay; i < lastDay; i++){
      let auxDay = this.emptyDay();
      auxDay.number = i;
      let dayData = this.getDayData(i);
      auxDay.name = dayData.name;
      position = position + 1;
      auxDay.position = position;
      //Buscar eventos del día
      auxWeek.days.push(auxDay);
    }

    return auxWeek;
  }

  getMonth(y,m){
    let month = this.emptyMonth();
    let weeks = [];
    let firstDay = new Date(y,m,1);
    let lastDay = new Date(y,m+1,0);
    let countWeeks = Math.ceil(lastDay.getDate() / this.daysInWeek);
    let pos = 0;

    let firstWeek = this.getWeek(0,firstDay.getDay(),this.daysInWeek,pos);
    pos = firstWeek.days.length;
    weeks.push(firstWeek);

    for(var w = 1; w < countWeeks-1; w++){
      let auxWeek = this.getWeek(w,0,this.daysInWeek,pos);
      pos = pos + auxWeek.days.length;
      weeks.push(auxWeek);
    }

    let lastWeek = this.getWeek(countWeeks-1,0,lastDay.getDay(),pos);
    weeks.push(lastWeek);
    month.weeks = weeks;
    let monthData = this.getMonthData(m-1);
    month.name = monthData.name;
    month.number = m - 1;
    month.year = y;

    return month;
  }
}
