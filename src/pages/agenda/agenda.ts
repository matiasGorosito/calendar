import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { UsersProvider } from '../../providers/users/users';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-agenda',
  providers: [ EventsProvider, UsersProvider ],
  templateUrl: 'agenda.html',
})
export class AgendaPage {
  items = [];
  storage: Storage;

  constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            storage: Storage, 
            public eventsService: EventsProvider,
            public usersService: UsersProvider) {
    this.storage = storage;

  }

  ionViewWillEnter() {
    this.loadEvents();
  }

  loadEvents(){
    this.usersService.getUserConnected().then((usuario_conectado) => {
      if(usuario_conectado){
        this.usersService.getUser(usuario_conectado).then((data) => {
          if(data.eventos){
            this.showEvents(data.eventos);
          }
          else{
            this.items = [];
          }
        });
      }
    });   
  }

  showEvents(eventos){
    for(let data of eventos) {
      this.addItem(data);
    }
  }

  addItem(data){
    var item = {
      title: null,
      content: null,
      icon: null,
      time: {subtitle: null, title: null}
    };
    var fechaInicio = new Date(Date.parse(data.fecha_inicio));
    var horaInicio = new Date(Date.parse(data.hora_inicio));
    
    item.title = data.titulo;
    item.content = data.descripcion;
    item.icon = "calendar";
    item.time.subtitle = this.formatoFecha(fechaInicio);
    item.time.title =  this.formatoHora(horaInicio);
    this.items.push(item);
  }
  
  agregarEvento(){
    this.eventsService.agregarEvento(AgendaPage);    
  }

  pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  formatoFecha(fecha){
    return this.pad(fecha.getDate(),2,'0') +  '/' + this.pad(fecha.getMonth()+1 ,2,'0') + '/' + fecha.getFullYear();  
  }

  formatoHora(hora){
    return this.pad(hora.getHours(),2,'0') + ':' + this.pad(hora.getMinutes(),2,'0');
  }

}
