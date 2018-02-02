import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { AgendaPage } from '../agenda/agenda';
import { Storage } from '@ionic/storage';
import { UsersProvider } from '../../providers/users/users';
import { AlertsProvider } from '../../providers/alerts/alerts';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  providers: [ UsersProvider, AlertsProvider ],
  templateUrl: 'login.html',
})
export class LoginPage {
  log;
  storage: Storage;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    storage: Storage,
    public usersService: UsersProvider,
    public alertService: AlertsProvider
  ) {
      this.log = {
        "usuario":null,
        "password":null
      }

      this.storage = storage;
      
      this.usersService.getUserConnected().then((usuario_conectado) => {
        if(usuario_conectado){
          this.navCtrl.setRoot(AgendaPage);  
        }
      });

  }
  
  login(){
    var log = this.log;

    this.usersService.getUser(log.usuario).then((data) =>{
      if(data && data.password == log.password){
        this.storage.set('usuario_conectado',log.usuario);
        this.alertService.message('OK','Correcto','Ha iniciado sesión en el sitio web correctamente.',AgendaPage);
      }
      else{
        this.alertService.message('ERROR','Error','Ha ingresado un e-mail y contraseña incorrectos.',null);
      }
    });

  }

  registrar(){
    this.navCtrl.push(RegistroPage,null,{direction:'forward'});
  }
}
