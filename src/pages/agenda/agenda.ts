import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { UsersProvider } from '../../providers/users/users';
import { DatesProvider } from '../../providers/dates/dates';
import { EventoPage } from '../evento/evento';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-agenda',
  providers: [ EventsProvider, UsersProvider, DatesProvider ],
  templateUrl: 'agenda.html',
})
export class AgendaPage {
  items = [];
  storage: Storage;
  days = [];
  range = {
    from:null,
    to:null
  }
  daysForScroll;

  constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            storage: Storage, 
            public eventsService: EventsProvider,
            public usersService: UsersProvider,
            public datesService: DatesProvider
          ) {
    this.storage = storage;
    this.daysForScroll = this.datesService.getDaysForScroll();
    let param = this.navParams.get('selectedDay');
    if(param){
      this.setRange(param);
    }
    else{
      this.setRange(this.getActualRange());
    }
  }

  ionViewWillEnter() {
    this.loadEvents();
  }

  loadEvents(){
    let range = this.getActiveRange();
    this.datesService.getDays(range.from,range.to).then((days) => {
      this.setDays(days);
    });
  }

  doInfinite(){
    let activeRange = this.getActiveRange();
    let extraRange = activeRange;
    extraRange.from = this.datesService.addDays(extraRange.to,1);
    extraRange.to = this.datesService.addDays(extraRange.from,this.daysForScroll*10);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.datesService.getDays(extraRange.from,extraRange.to).then((days) => {
          if(days.length>0){
            for(let day of days){
              this.days.push(day);
            }
          }
          let newRange = this.getActiveRange();
          newRange.to = extraRange.to;
          this.setRange(newRange);
          resolve(); 
        });
      },500);

    });
  }

  getActualRange(){
    let range = {
      from: this.datesService.addDays(new Date(),-this.daysForScroll),
      to: this.datesService.addDays(new Date(),this.daysForScroll)
    }
    return range;
  }

  getActiveRange(){
    return {
     from: this.range.from,
     to: this.range.to 
    };
  }

  setRange(range){
    this.range = range;
  }

  setDays(days){
    this.days = days;
  }
  
  agregarEvento(){
    this.eventsService.agregarEvento(EventoPage,AgendaPage);    
  }

  editarEvento(id){
    this.eventsService.editarEvento(EventoPage,AgendaPage,id);
  }


}
