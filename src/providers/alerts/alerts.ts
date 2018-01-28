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

  message(result,title,subTitle,redirectPage){
    let alert = this.alertCtrl.create({
      title:title,
      subTitle:subTitle,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if(result=='OK'){
              this.navCtrl.setRoot(redirectPage);
            }
          }
        }
      ]
    });     
    alert.present();  
  }

}
