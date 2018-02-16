import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AlertsProvider } from '../../providers/alerts/alerts';
import { DatesProvider } from '../../providers/dates/dates';
import { EventsProvider } from '../../providers/events/events';

/**
 * Generated class for the EventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evento',
  providers: [ UsersProvider, AlertsProvider, DatesProvider, EventsProvider ],
  templateUrl: 'evento.html',
})
export class EventoPage {
  paginaOrigen;
  id;
  oper;
  evento;
  eventTypes;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public usersService: UsersProvider,
    public alertService: AlertsProvider,
    public alertCtrl: AlertController,
    public datesService: DatesProvider,
    public eventsService: EventsProvider
  ) {
    var actualDate = new Date();
    var startDate = new Date(actualDate.setMinutes(0));
    var endDate = new Date(this.datesService.addHoursToDate(new Date(startDate),1));

    this.evento = {
      "id":null,
      "titulo":null,
      "fecha_inicio":startDate.toISOString(),
      "fecha_fin":endDate.toISOString(),
      "ubicacion":null,
      "descripcion":null,
      "dia_completo":false,
      "activo":true,
      "tipo":null
    }
    
    this.eventTypes = this.eventsService.getEventTypes();
    this.paginaOrigen = this.navParams.get('origen');
    this.id = this.navParams.get('id');

    if(this.id != null){
      this.oper = 'edit';
      this.usersService.findUserEvent(this.id).then((evento) => {
        this.evento = evento;
      });
    }
    else{
      this.oper = 'add';
    }

  }

  guardar(){
    var data = this.evento;
    if(data.titulo == null || data.tipo == null){
      this.alertService.message('ERROR','Datos obligatorios','Debe cargar título y tipo de evento para continuar.',null);
      return;
    }

    if(data.fecha_inicio.valueOf() > data.fecha_fin.valueOf()){
      this.alertService.message('ERROR','Rango de fechas inválido','Debe ingresar una fecha de inicio menor o igual a la fecha fin.',null);
      return;
    }

    if(data.dia_completo){
      data.fecha_inicio = this.datesService.setFullDay(data.fecha_inicio);
      data.fecha_fin = this.datesService.setFullDay(data.fecha_fin);
    }
    
    try{
      if(this.oper == 'add'){
        this.usersService.saveEvent(this.evento);
      }
      else{
        this.usersService.changeEvent(this.evento,this.oper);
      }
      this.alertService.message('OK','Evento guardado','Se ha guardado correctamente su evento.',null);
      this.navCtrl.pop();//push(this.paginaOrigen);
    }
    catch(e){
      this.alertService.message('ERROR','Error','Ocurrió un error al guardar el evento, vuelva a intentarlo.',null);
    }
  }

  eliminar(){
    let alert = this.alertCtrl.create({
      title:'Eliminar evento',
      subTitle:'Desea eliminar el evento?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {

          }
        },       
        {
          text: 'Confirmar',
          handler: () => {
            this.usersService.changeEvent(this.evento,'del').then((result) => {
              this.alertService.message('OK','Evento eliminado','Se ha eliminado el evento.',null);
              this.navCtrl.pop();            
            }).catch((reason) => {
              console.log(reason);
              this.alertService.message('ERROR','Error','Ocurrió un error al eliminar el evento, vuelva a intentarlo.',null);        
            });
          }  
        },
      ]
    });
    
    alert.present();    
  }

}
