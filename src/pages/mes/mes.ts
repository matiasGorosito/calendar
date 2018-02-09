import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

/**
 * Generated class for the MesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mes',
  templateUrl: 'mes.html',
})
export class MesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private calendar: Calendar) {
    this.calendar.createCalendar('Calendario').then(
      (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
  }



}
