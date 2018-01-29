import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the EventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evento',
  providers: [ UsersProvider ],
  templateUrl: 'evento.html',
})
export class EventoPage {
  paginaOrigen;
  id;
  oper;
  evento;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usersService: UsersProvider) {
    var actualDate = new Date();
    var startTime = new Date(actualDate.setMinutes(0));
    var endTime = new Date(startTime.setHours(startTime.getHours()+1));

    this.evento = {
      "titulo":null,
      "fecha_inicio":actualDate.toISOString(),
      "hora_inicio":startTime.toISOString(),
      "fecha_fin":actualDate.toISOString(),
      "hora_fin":endTime.toISOString(),
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

  guardar(){
    this.usersService.saveEvent(this.evento);
  }

}
