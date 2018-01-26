import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventoPage } from '../../pages/evento/evento';

/**
 * Generated class for the EventsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'events',
  templateUrl: 'events.html'
})
export class EventsComponent {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  agregarEvento(paginaOrigen){
    this.navCtrl.setRoot(EventoPage,{ origen: paginaOrigen});
  }  

  editarEvento(paginaOrigen,id){
    this.navCtrl.setRoot(EventoPage,{ origen:paginaOrigen, id:id});
  }
}
