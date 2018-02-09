import { AlertController, NavController} from 'ionic-angular';
import { Injectable } from '@angular/core';

/*
  Generated class for the AlertsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertsProvider {

  constructor(public alertCtrl: AlertController, public navCtrl: NavController) {
  }

  confirm(title,subtitle,handlerOk,handlerCancel){
    let alert = this.alertCtrl.create({
      title:title,
      subTitle:subtitle,
      buttons: [
        {
          text: 'OK',
          handler: () => handlerOk()
        },
        {
          text: 'Cancel',
          handler: () => handlerCancel()
        }
      ]
    });
    
    alert.present();
  }

  message(result,title,subTitle,redirectPage){
    let alert = this.alertCtrl.create({
      title:title,
      subTitle:subTitle,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if(result=='OK' && redirectPage != null){
              this.navCtrl.setRoot(redirectPage);
            }
          }
        }
      ]
    });     
    alert.present();  
  }

}
