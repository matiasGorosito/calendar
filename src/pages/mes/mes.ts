import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { UsersProvider } from '../../providers/users/users';
import { DatesProvider } from '../../providers/dates/dates';
import { EventoPage } from '../evento/evento';
import { DiaPage } from '../dia/dia';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


/**
 * Generated class for the MesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mes',
  providers: [ EventsProvider, UsersProvider, DatesProvider ],
  templateUrl: 'mes.html',
})
export class MesPage {
  @ViewChild(Slides) slides: Slides;
  namesOfDays = [];
  namesOfMonths = [];
  actualDate = new Date();
  selectedMonth;
  selectedYear;
  months = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventsService: EventsProvider,
    public usersService: UsersProvider,
    public datesService: DatesProvider) {
      this.namesOfMonths = this.datesService.getNamesOfMonths();
      this.namesOfDays = this.datesService.getNamesOfDays();
      this.selectedMonth = this.namesOfMonths.find(m => m.number == this.actualDate.getMonth());
      this.selectedYear = this.actualDate.getFullYear();
      this.datesService.getMonth(this.selectedYear,this.selectedMonth.number).then((month) => {
        this.months.push(month);
      });
  }

  loadVisibleMonths(){
    
  }

  agregarEvento(){
    this.eventsService.agregarEvento(EventoPage,MesPage);    
  }
  
  editarEvento(id){
    this.eventsService.editarEvento(EventoPage,MesPage,id);
  }

  verDia(positionDay,numberMonth,year){
    this.navCtrl.push(DiaPage,{day:positionDay,numberMonth:numberMonth,year:year});
  }

  isActiveNumber(n){
    return n == this.selectedMonth.number;
  }

  isActualNumber(d,m,y){
    let actualYear = this.actualDate.getFullYear();
    let actualMonth = this.actualDate.getMonth();
    let actualDay = this.actualDate.getDate();
    return (actualDay == d && actualMonth == m && actualYear == y);
  }

  isActualDay(d){
    let actualYear = this.actualDate.getFullYear();
    let actualMonth = this.actualDate.getMonth();
    let actualDay = this.actualDate.getDay();
    return (actualDay == d && actualMonth == this.selectedMonth.number && actualYear == this.selectedYear);
  }
}
