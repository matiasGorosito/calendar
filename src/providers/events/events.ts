import { NavController, NavParams } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {
  storage: Storage;
  types;

  constructor(public navCtrl: NavController, public navParams: NavParams,storage: Storage) {
    this.storage = storage;
    this.types = [
      {
        type:'evento',
        description:'Evento',
        icon:'calendar'
      },
      {
        type:'fiesta',
        description:'Fiesta',
        icon:'beer'
      },
      {
        type:'recordatorio',
        description:'Recordatorio',
        icon:'checkmark-circle'
      },
      {
        type:'viaje',
        description:'Viaje',
        icon:'plane'
      },
      {
        type:'futbol',
        description:'Fútbol',
        icon:'football'
      }
    ];  

  }

  agregarEvento(paginaPush,paginaOrigen){
    this.navCtrl.push(paginaPush,{ origen: paginaOrigen});
  }  

  editarEvento(paginaPush,paginaOrigen,id){
    this.navCtrl.push(paginaPush,{ origen:paginaOrigen, id:id});
  }

  compareDates(s1,s2){
    s1 = s1.split('/');
    s2 = s2.split('/');
    let d1 = new Date(s1[2],s1[1],s1[0]);
    let d2 = new Date(s2[2],s2[1],s2[0]);
    return d1.valueOf() - d2.valueOf();
  }

  compareHours(s1,s2){
    s1 = s1.split(':');
    s2 = s2.split(':');
    if(s1[0] == s2[0]){
      return parseInt(s1[1]) - parseInt(s2[1]);
    }
    else{
      return parseInt(s1[0]) - parseInt(s2[0]);
    }
  }

  orderDays(days){
    return days.sort((d1,d2) => {
      return this.compareDates(d1.date,d2.date);
    });
  }  

  orderEvents(events){
    return events.sort((e1,e2) => {
      let ret;
      if(e1.startTime == null && e2.startTime == null){
        ret = 0;
      }
      else if(e1.startTime == null && e2.startTime != null){
        ret = -1;
      }
      else if(e1.startTime != null && e2.startTime == null){
        ret = 1;
      }
      else{
        ret = this.compareHours(e1.startTime,e2.startTime);
      }
      
      return ret;
    });
  }

  getEventTypes(){
    return this.types;
  }

  findEventIcon(type){
    return this.getEventTypes().find(t => t.type == type);
  }
}
