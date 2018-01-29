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
  evento;
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.evento = {
      "titulo":null,
      "fecha_inicio":new Date().toISOString(),
      "hora_inicio":new Date().toISOString(),
      "fecha_fin":new Date().toISOString(),
      "hora_fin":new Date().toISOString(),
      "ubicacion":null,
      "descripcion":null,
      "dia_completo":false,
    }
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
