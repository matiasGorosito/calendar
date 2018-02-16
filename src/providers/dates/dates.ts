import { Injectable } from '@angular/core';
import { UsersProvider } from '../users/users';
import { EventsProvider } from '../events/events';

/*
  Generated class for the DatesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatesProvider {
  namesOfDays;
  namesOfMonths;
  private daysInWeek = 7;
  weeksForMonth;
  private daysForScroll = 15;

  constructor(public usersService: UsersProvider, public eventsService: EventsProvider) {
    this.weeksForMonth = 6;

    this.namesOfDays = [
      {
        name: 'dom',
        position: 0
      },
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
      }
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

  getDaysForScroll(){
    return this.daysForScroll;
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
      events: []
    }
  }

  emptyMonth(){
    return {
      number: null,
      year: null,
      name: null,
      weeks: [],
      active: false
    }
  }

  getDayData(n){
    return this.getNamesOfDays().find(d => d.position == n);
  }

  getMonthData(n){
    return this.getNamesOfMonths().find(m => m.number == n);
  }

  getDateWithOutTime(date){
    let aux = new Date(date);
    aux.setUTCHours(0,0,0,0);
    return aux;
  }  

  addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }  

  getEventsOfDay(events,date){
    if(events == null){ return []};
    return events.filter(e => this.getDateWithOutTime(this.parse(e.fecha_inicio)).valueOf() == this.getDateWithOutTime(date).valueOf());
  }

  getWeek(y,m,id,firstDayWeek,lastDayWeek,position,events,isChangeInWeek){
    let auxDate;
    let auxWeek = this.emptyWeek();
    auxWeek.id = id;

    let lastDayPrevMonth = new Date(y,m,0);

    for(var f = 0; f < firstDayWeek && firstDayWeek > 0; f++){
      let auxDay = this.emptyDay();
      auxDay.number = f;
      auxDay.position = lastDayPrevMonth.getDate() - firstDayWeek + f + 1;
      auxDay.numberMonth = m-1;
      auxDate = new Date(y,m-1,position,0,0,0,0);
      auxDay.events = this.getEventsOfDay(events,auxDate);
      auxWeek.days.push(auxDay);
    }

    for(var i = firstDayWeek; i < lastDayWeek; i++){
      let auxDay = this.emptyDay();
      auxDay.number = i;
      position = position + 1;
      auxDay.position = position;
      if(isChangeInWeek){
        let nextMonth = this.getNextMonth(y,m);
        auxDay.numberMonth = nextMonth.month;
        auxDate = new Date(nextMonth.month.year,nextMonth.month,position,0,0,0,0);
      }
      else{
        auxDay.numberMonth = m;
        auxDate = new Date(y,m,position,0,0,0,0);
      }
      auxDay.events = this.getEventsOfDay(events,auxDate);
      auxWeek.days.push(auxDay);
    }

    let firstDayNextMonth = new Date(y,m+1,1);
    for(var l = lastDayWeek; l < this.daysInWeek && lastDayWeek < this.daysInWeek; l++){
      let auxDay = this.emptyDay();
      auxDay.number = l;
      auxDay.position = firstDayNextMonth.getDate() + l - lastDayWeek;
      auxDay.numberMonth = m + 1;
      auxDate = new Date(y,m+1,position,0,0,0,0);
      auxDay.events = this.getEventsOfDay(events,auxDate);
      auxWeek.days.push(auxDay);
    }    

    return auxWeek;
  }

  getMonth(y,m){
    let month = this.emptyMonth();
    let weeks = [];
    let firstDay = this.firstDayOfMonth(y,m);
    let lastDay = this.lastDayOfMonth(y,m);
    let countWeeks = this.getWeeksForMonth();
    let pos = 0;

    let from = this.addDays(firstDay,-this.daysInWeek);
    let to = this.addDays(lastDay,this.daysInWeek);

    return this.usersService.getUserEventsByDateRange(from,to).then((events)=>{
      let firstWeek = this.getWeek(y,m,0,firstDay.getDay(),this.daysInWeek,pos,events,false);
      pos = this.daysInWeek - firstDay.getDay();
      weeks.push(firstWeek);
      
      for(var w = 1; w < countWeeks-2; w++){
        let auxWeek = this.getWeek(y,m,w,0,this.daysInWeek,pos,events,false);
        pos = pos + auxWeek.days.length;
        weeks.push(auxWeek);
      }
      let penultimateWeek;
      if(pos+this.daysInWeek <= lastDay.getDate()){
        penultimateWeek = this.getWeek(y,m,countWeeks-2,0,this.daysInWeek,pos,events,false);
        if(pos + this.daysInWeek == lastDay.getDate()){
          pos = 0;
        }
        else{
          pos = pos + this.daysInWeek;
        }
        weeks.push(penultimateWeek);
      }
      else{
        penultimateWeek = this.getWeek(y,m,countWeeks-2,0,lastDay.getDay()+1,pos,events,false);
        pos = this.daysInWeek - 1 - lastDay.getDay();
        weeks.push(penultimateWeek);
      }

      let lastWeek;
      if(pos+this.daysInWeek <= lastDay.getDate()){
        lastWeek = this.getWeek(y,m,countWeeks-1,0,this.daysInWeek,pos,events,true);
        pos = pos + this.daysInWeek;
        weeks.push(lastWeek);
      }
      else{
        lastWeek = this.getWeek(y,m,countWeeks-1,0,lastDay.getDay()+1,pos,events,false);
        pos = this.daysInWeek - 1 - lastDay.getDay();
        weeks.push(lastWeek);
      }      

      /*let lastWeek = this.getWeek(y,m,countWeeks-1,0,lastDay.getDay()+1,pos,events);
      weeks.push(lastWeek);*/
  
      month.weeks = weeks;
      let monthData = this.getMonthData(m);
      month.name = monthData.name;
      month.number = m;
      month.year = y;
  
      return month;
    });
  }

  getDays(from,to){
    let days = [];
    return this.usersService.getUserEventsByDateRange(from,to).then((events) => {
      for(let data of events) {
        var aDate = this.formatoFecha(this.parse(data.fecha_inicio));
        var exists = false;
        
        for(let day of days){
          if(day.date == aDate && !exists){
            exists = true;
            break;
          }
        }
    
        if(!exists){
          var aDay = {
            title:null,
            date:null,
            events:[]
          };
          aDay.title = this.generateTitle(aDate);
          aDay.date = aDate;
          days.push(aDay);
        }
      }
      
      days = this.eventsService.orderDays(days);

      for(let day of days){
        var auxItems = [];
    
        for(let event of events){
          var auxItem = this.emptyItem();
          var startDate = this.formatoFecha(this.parse(event.fecha_inicio));
          if(startDate == day.date){
            auxItem.description = event.descripcion;
            auxItem.title = event.titulo;
            if(!event.dia_completo){
              auxItem.startTime = this.formatoHora(this.parse(event.fecha_inicio));
            }
            auxItem.id = event.id;
            auxItem.icon = this.eventsService.findEventIcon(event.tipo).icon;
            auxItems.push(auxItem);
          }
        }
        day.events = this.eventsService.orderEvents(auxItems);        
      }      

      return days;
    });
  }

  emptyItem(){
    return {
      title:null,
      description : null,
      startTime: null,
      icon:null,
      id:null
    };
  }

  getWeeksForMonth(){
    return this.weeksForMonth;
  }

  firstDayOfMonth(y,m){
    return new Date(y,m,1,0,0,0,0);
  }

  lastDayOfMonth(y,m){
    return new Date(y,m+1,0,0,0,0,0);
  }

  generateDays(from,to){
    let days = [];
    for(let d=from ; d <= to; d.setDate(d.getDate()+1)){
      days.push({
        title:d,
        date:d,
        events:[]
      });
    }

    return days;
  }

  getActualDay(){
    let actualDate = new Date();
    return {    
      day: {
        position:actualDate.getDay(),
        number:actualDate.getDate()
      },
      month: {
        number: actualDate.getMonth(),
        year: actualDate.getFullYear(),
        name: this.namesOfMonths.find(aux => aux.number == actualDate.getMonth()).name
      }
    };
  }    

  generateTitle(date){
    var today = this.formatoFecha(this.parse(new Date()));
    var yesterday = this.formatoFecha(this.parse(this.addDays(new Date(),-1)));
    var tomorrow = this.formatoFecha(this.parse(this.addDays(new Date(),1)));
    var ret;

    if(today == date){
      ret = 'Hoy';
    }
    else if(yesterday == date){
      ret = 'Ayer';
    }
    else if(tomorrow == date){
      ret = 'Mañana';
    }
    else{
      ret = date;
    }

    return ret;    
  }

  getPrevMonth(y,m){
    let a = {
      'year':null,
      'month':null
    }
    a.year = m==0?y-1:y;
    a.month = m==0?11:m-1;
    return a;
  }
  
  getNextMonth(y,m){
    let a = {
      'year':null,
      'month':null
    }
    a.year = m==11?y+1:y;
    a.month = m==11?0:m+1;
    return a;
  }  

}
