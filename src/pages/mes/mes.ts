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
  activeMonths = [];
  slideIndex;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventsService: EventsProvider,
    public usersService: UsersProvider,
    public datesService: DatesProvider) {
      this.namesOfMonths = this.datesService.getNamesOfMonths();
      this.namesOfDays = this.datesService.getNamesOfDays();
      
      /*this.selectedMonth = this.namesOfMonths.find(m => m.number == this.actualDate.getMonth());
      this.selectedYear = this.actualDate.getFullYear();*/
      this.loadMonth(this.actualDate.getFullYear(),this.actualDate.getMonth());
  }

  loadMonth(y,m){
    this.selectedMonth = this.namesOfMonths.find(aux => aux.number == m);
    this.selectedYear = y;
    let prev = this.getPrevMonth(y,m);
    let next = this.getNextMonth(y,m);

    this.datesService.getMonth(prev.year,prev.month).then((month) => {
      this.months.push(month);
    });
    this.datesService.getMonth(y,m).then((month) => {
      month.active = true;
      //this.activeMonths.push(month);
      this.months.push(month);
    });
    this.datesService.getMonth(next.year,next.month).then((month) => {
      this.months.push(month);
    });
  }

  toActualMonth(){
    let actual = this.getActualMonth();
    this.loadMonth(actual.year,actual.month);
  }

  toPrevMonth(){
    let prev = this.getPrevMonth(this.selectedYear,this.selectedMonth.number);
    this.loadMonth(prev.year,prev.month);
  }
  
  toNextMonth(){
    let next = this.getNextMonth(this.selectedYear,this.selectedMonth.number);
    this.loadMonth(next.year,next.month);
  }

  getActualMonth(){
    let a = {
      'year':null,
      'month':null
    }
    a.year = this.actualDate.getFullYear();
    a.month = this.actualDate.getMonth();
    return a;
  }

  getPrevMonth(y,m){
    let a = {
      'year':null,
      'month':null
    }
    a.year = m==0?y-1:y;
    a.month = m==0?11:m-1;
    return a;
  }
  
  getNextMonth(y,m){
    let a = {
      'year':null,
      'month':null
    }
    a.year = m==11?y+1:y;
    a.month = m==11?0:m+1;
    return a;
  }

  slideChanged(){   
      let currentIndex = this.slides.getActiveIndex();
      if(this.slideIndex > currentIndex){ //Se corrió a mes anterior
        let prev = this.getPrevMonth(this.selectedYear,this.selectedMonth.number);
        this.loadMonth(prev.year,prev.month);
      }
      else{
        let next = this.getNextMonth(this.selectedYear,this.selectedMonth.number);
        this.loadMonth(next.year,next.month);
      }
      this.slides.update();
      this.slideIndex = currentIndex;
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
