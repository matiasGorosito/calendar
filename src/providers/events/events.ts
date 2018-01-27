import { NavController, NavParams } from 'ionic-angular';
import { EventoPage } from '../../pages/evento/evento';
import { Injectable } from '@angular/core';

/*
  Generated class for the EventsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsProvider {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }
  agregarEvento(paginaOrigen){
    this.navCtrl.setRoot(EventoPage,{ origen: paginaOrigen});
  }  

  editarEvento(paginaOrigen,id){
    this.navCtrl.setRoot(EventoPage,{ origen:paginaOrigen, id:id});
  }
}
