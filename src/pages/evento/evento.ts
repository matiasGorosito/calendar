import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AlertsProvider } from '../../providers/alerts/alerts';

/**
 * Generated class for the EventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evento',
  providers: [ UsersProvider, AlertsProvider ],
  templateUrl: 'evento.html',
})
export class EventoPage {
  paginaOrigen;
  id;
  oper;
  evento;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public usersService: UsersProvider,
    public alertService: AlertsProvider) {
    var actualDate = new Date();
    var startTime = new Date(actualDate.setMinutes(0));
    var endTime = new Date(startTime.setHours(startTime.getHours()+1));
      
    this.evento = {
      "id":null,
      "titulo":null,
      "fecha_inicio":actualDate.toISOString(),
      "hora_inicio":startTime.toISOString(),
      "fecha_fin":actualDate.toISOString(),
      "hora_fin":endTime.toISOString(),
      "ubicacion":null,
      "descripcion":null,
      "dia_completo":false,
      "activo":true
    }

    this.paginaOrigen = this.navParams.get('origen');
    this.id = this.navParams.get('id');

    if(this.id){
      this.oper = 'Editar';
    }
    else{
      this.oper = 'Agregar';
    }

  }

  guardar(){
    var data = this.evento;
    if(data.titulo == null || data.ubicacion == null || data.descripcion == null){
      this.alertService.message('ERROR','Datos obligatorios','Todos los datos del formulario son obligatorios. Cargue los campos que estén en blanco.',null);
      return;
    }
    
    try{
      this.usersService.saveEvent(this.evento);
      this.alertService.message('OK','Evento creado','Se ha creado correctamente su evento.',null);
      this.navCtrl.pop();//push(this.paginaOrigen);
    }
    catch(e){
      this.alertService.message('ERROR','Error','Ocurrió un error al guardar el evento, vuelva a intentarlo.',null);
    }
  }

}
