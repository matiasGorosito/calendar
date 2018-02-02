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
  days = [
      {
        title:"Hoy",
        date: "31/01/2018",
        events:[
          {
            title:'Prueba',
            description : 'Evento de prueba',
            startTime: '05:50',
            icon: 'calendar'
          },
          {
            title:'Prueba 2',
            description : 'Evento de prueba',
            startTime: '07:50',
            icon: 'beer'
          },
          {
            title:'Prueba 3',
            description : 'Evento de prueba',
            startTime: '08:50',
            icon: 'football'
          }
        ]
      },
      {
        title:"Mañana",
        date: "01/02/2018",
        events:[
          {
            title:'Prueba 4',
            description : 'Evento de prueba',
            startTime: '05:50',
            icon: 'time'
          },
          {
            title:'Prueba 5',
            description : 'Evento de prueba',
            startTime: '07:50',
            icon: 'calendar'
          },
          {
            title:'Prueba 6',
            description : 'Evento de prueba',
            startTime: '08:50',
            icon: 'beer'
          }
        ]
      }
  ];
  emptyDay = {
    title:null,
    date:null,
    events:[]
  }

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
    this.usersService.getUserConnected().then((usuario_conectado) => {
      if(usuario_conectado){
        this.usersService.getUser(usuario_conectado).then((data) => {
          this.items = [];
          if(data.eventos){
            this.showEvents(data.eventos);
          }
        });
      }
    });   
  }

  showEvents(eventos){
    for(let data of eventos) {
      this.addDay(data.fecha_inicio);
      this.addItem(data);
    }
  }

  addDay(date){
    var aDate = date;
    var exists = false;
    var BreakException = {};
    try{
      for(let day of this.days){
        if(day.date == aDate && !exists){
          exists = true;
          throw BreakException;
        }
      }
    }
    catch(e){
      if(e !== BreakException) throw e;
    }

    if(!exists){
      var aDay = this.emptyDay;
      aDay.title = aDate;
      aDay.date = aDate;
    }
  }

  addItem(data){
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
  }
  
  agregarEvento(){
    this.eventsService.agregarEvento(AgendaPage);    
  }

}
