import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { UsersProvider } from '../../providers/users/users';
import { DatesProvider } from '../../providers/dates/dates';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-agenda',
  providers: [ EventsProvider, UsersProvider, DatesProvider ],
  templateUrl: 'agenda.html',
})
export class AgendaPage {
  items = [];
  storage: Storage;
  days = [];

  constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            storage: Storage, 
            public eventsService: EventsProvider,
            public usersService: UsersProvider,
            public datesService: DatesProvider
          ) {
    this.storage = storage;

  }

  ionViewWillEnter() {
    this.loadEvents();
  }

  loadEvents(){
    this.usersService.getUserEvents().then((eventos) => {
      if(eventos){
        this.showEvents(eventos);
      }
    }); 
  }

  showEvents(events){
    events = this.getActiveEvents(events);
    this.clearDays();
    for(let data of events) {
      this.addDay(data.fecha_inicio);
    }

    for(let day of this.getDays()){
      this.addItems(day,events);
    }
  }

  clearDays(){
    this.days = [];
  }

  getActiveEvents(events){
    return events.filter(event => event.activo);
  }

  addItems(aDay,events){
    var auxItems = [];

    for(let event of events){
      var auxItem = this.emptyItem();
      var startDate = this.datesService.formatoFecha(this.datesService.parse(event.fecha_inicio));
      if(startDate == aDay.date){
        auxItem.description = event.descripcion;
        auxItem.title = event.titulo;
        auxItem.startTime = this.datesService.formatoHora(this.datesService.parse(event.fecha_inicio));
        auxItem.icon = 'calendar';
        auxItem.id = event.id;
        auxItems.push(auxItem);
      }
    }
    aDay.events = auxItems;
  }

  addDay(date){
    var aDate = this.datesService.formatoFecha(this.datesService.parse(date));
    var exists = false;
    
    for(let day of this.days){
      if(day.date == aDate && !exists){
        exists = true;
        break;
      }
    }

    if(!exists){
      var aDay = this.emptyDay();
      aDay.title = aDate;
      aDay.date = aDate;
      this.pushDays(aDay);
    }
  }
  /*addItem(data){
    var item = {
      title: null,
      content: null,
      icon: null,
      time: {subtitle: null, title: null}
    };
    var fechaInicio = this.datesService.parse(data.fecha_inicio);
    var horaInicio = this.datesService.parse(data.hora_inicio);
    
    item.title = data.titulo;
    item.content = data.descripcion;
    item.icon = "calendar";
    item.time.subtitle = this.datesService.formatoFecha(fechaInicio);
    item.time.title =  this.datesService.formatoHora(horaInicio);
    this.items.push(item);
  }*/

  /*addItem(data){
    var item = this.emptyItem();
    var fechaInicio = this.datesService.parse(data.fecha_inicio);
    var horaInicio = this.datesService.parse(data.hora_inicio);
    
    item.title = data.titulo;
    item.content = data.descripcion;
    item.icon = "calendar";
    item.time.startDate = this.datesService.formatoFecha(fechaInicio);
    item.time.startTime =  this.datesService.formatoHora(horaInicio);
    this.items.push(item);
  }  */
  
  agregarEvento(){
    this.eventsService.agregarEvento(AgendaPage);    
  }

  editarEvento(id){
    this.eventsService.editarEvento(AgendaPage,id);
  }

  /*emptyItem(){
    return {
      title: null,
      content: null,
      icon: null,
      time: {startDate: null, startTime: null}
    };
  }*/

  emptyItem(){
    return {
      title:null,
      description : null,
      startTime: null,
      icon:null,
      id:null
    };
  }

  emptyDay(){
    return {
      title:null,
      date:null,
      events:[]
    };
  }

  getDays(){
    return this.days;
  }

  pushDays(aDay){
    this.days.push(aDay);
  }


}
