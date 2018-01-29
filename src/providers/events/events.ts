import { NavController, NavParams } from 'ionic-angular';
import { EventoPage } from '../../pages/evento/evento';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,storage: Storage) {
    this.storage = storage;
  }
  agregarEvento(paginaOrigen){
    this.navCtrl.push(EventoPage,{ origen: paginaOrigen});
  }  

  editarEvento(paginaOrigen,id){
    this.navCtrl.push(EventoPage,{ origen:paginaOrigen, id:id});
  }

}
