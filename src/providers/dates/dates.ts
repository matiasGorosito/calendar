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
  weeksForMonth;

  constructor() {
    this.weeksForMonth = 5;

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
      number: null,
      numberMonth: null,
      position: null,
      events: [{
        'description':'Evento'
      }]
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
    return this.getNamesOfDays().find(d => d.position == n);
  }

  getMonthData(n){
    return this.getNamesOfMonths().find(m => m.number == n);
  }

  getWeek(y,m,id,firstDayWeek,lastDayWeek,position){
    let auxWeek = this.emptyWeek();
    auxWeek.id = id;

    let lastDayPrevMonth = new Date(y,m,0);

    for(var f = 0; f < firstDayWeek && firstDayWeek > 0; f++){
      let auxDay = this.emptyDay();
      auxDay.number = f;
      auxDay.position = lastDayPrevMonth.getDate() - firstDayWeek + f + 1;
      auxDay.numberMonth = m-1;
      //Buscar eventos del día
      auxWeek.days.push(auxDay);
    }

    for(var i = firstDayWeek; i < lastDayWeek; i++){
      let auxDay = this.emptyDay();
      auxDay.number = i;
      /*let dayData = this.getDayData(i);
      auxDay.name = dayData.name;*/
      position = position + 1;
      auxDay.position = position;
      auxDay.numberMonth = m;
      //Buscar eventos del día
      auxWeek.days.push(auxDay);
    }

    let firstDayNextMonth = new Date(y,m+1,1);
    for(var l = lastDayWeek; l < this.daysInWeek && lastDayWeek < this.daysInWeek; l++){
      let auxDay = this.emptyDay();
      auxDay.number = l;
      auxDay.position = firstDayNextMonth.getDate() + l - lastDayWeek;
      auxDay.numberMonth = m + 1;
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
    let countWeeks = this.getWeeksForMonth();
    let pos = 0;
    
    let firstWeek = this.getWeek(y,m,0,firstDay.getDay(),this.daysInWeek,pos);
    pos = this.daysInWeek - firstDay.getDay();
    weeks.push(firstWeek);
    
    for(var w = 1; w < countWeeks-1; w++){
      let auxWeek = this.getWeek(y,m,w,0,this.daysInWeek,pos);
      pos = pos + auxWeek.days.length;
      weeks.push(auxWeek);
    }

    let lastWeek = this.getWeek(y,m,countWeeks-1,0,lastDay.getDay()+1,pos);
    weeks.push(lastWeek);

    month.weeks = weeks;
    let monthData = this.getMonthData(m);
    month.name = monthData.name;
    month.number = m;
    month.year = y;

    return month;
  }

  getWeeksForMonth(){
    return this.weeksForMonth;
  }
}
