import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { UsersProvider } from '../../providers/users/users';
import { DatesProvider } from '../../providers/dates/dates';

/**
 * Generated class for the DiaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dia',
  providers: [ EventsProvider, UsersProvider, DatesProvider ],
  templateUrl: 'dia.html',
})
export class DiaPage {
  activeDay = {
    day: {
      position:null,
      number:null,
      events: []
    },
    month: {
      number: null,
      year: null,
      name: null
    }
  };
  actualDate = new Date();
  namesOfDays = [];
  namesOfMonths = [];
  items = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public eventsService: EventsProvider,
              public usersService: UsersProvider,
              public datesService: DatesProvider
            ) {
    this.namesOfMonths = this.datesService.getNamesOfMonths();
    this.namesOfDays = this.datesService.getNamesOfDays();

    let param = this.navParams.get('selectedDay');
    if(param){
      this.activeDay = param;
    }
    else{
      this.toActualDay();
    }

    
  }

  toActualDay(){
    let actual = this.datesService.getActualDay();
    this.loadDay(actual);
  }  

  loadDay(day){
    /*this.datesService.getDay(day).then((day) => {
      this.setActiveDay(day);
    });*/
  }

  setActiveDay(day){
    this.activeDay = day;
  }

}
