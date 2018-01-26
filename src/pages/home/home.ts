import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datePicker: DatePicker;
  constructor(public navCtrl: NavController, storage: Storage, datePicker: DatePicker) {
    this.datePicker = datePicker;
  }

  mostrarCalendario(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );    
  }

}
