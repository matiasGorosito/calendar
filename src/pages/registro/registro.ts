import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AgendaPage } from '../agenda/agenda';
import { UsersProvider } from '../../providers/users/users';
import { AlertsProvider } from '../../providers/alerts/alerts';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registro',
  providers: [ UsersProvider, AlertsProvider ],
  templateUrl: 'registro.html',
})
export class RegistroPage {
  registro;
  storage: Storage;
  
    constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                public alertCtrl: AlertController,
                storage: Storage,
                public usersService: UsersProvider,
                public alertService: AlertsProvider) {
      this.registro = {
        "nombre":null,
        "apellido":null,
        "usuario":null,
        "password":null,
        "repassword":null
      }    

      this.storage = storage;
    }
  
    enviar (){
        var reg = this.registro;
        if(reg.apellido == null || reg.nombre == null || reg.usuario == null || reg.password == null || reg.repassword == null){
          this.alertService.message('ERROR','Datos obligatorios','Todos los datos del formulario son obligatorios. Cargue los campos que estén en blanco.',null);
          return;
        }
  
        if(reg.password != reg.repassword){
          this.alertService.message('ERROR','Contraseña incorrecta','Ha ingresado dos contraseñas diferentes. Verifique los datos ingresados.',null);
          return;
        }

        this.usersService.getUser(reg.usuario).then((data) =>{
          if(data && data.usuario != null){
            this.alertService.message('ERROR','Usuario existente','El usuario que desea crear ya se encuentra registrado. Escriba otro nombre de usuario.',null);
          }
          else{
            this.usersService.createUser(reg.usuario,reg);
            this.usersService.setUserConnected(reg.usuario);
            this.alertService.message('OK','Cuenta creada','Su cuenta ha sido creada correctamente',AgendaPage);
          }
        });
    }
 
}
