import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  paginaOrigen;
  id;
  oper;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.paginaOrigen = this.navParams.get('paginaOrigen');
    this.id = this.navParams.get('id');

    if(this.id){
      this.oper = 'Editar';
    }
    else{
      this.oper = 'Agregar';
    }


  }

}
