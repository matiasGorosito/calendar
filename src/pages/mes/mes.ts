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

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventsService: EventsProvider,
    public usersService: UsersProvider,
    public datesService: DatesProvider) {
      this.namesOfMonths = this.datesService.getNamesOfMonths();
      this.namesOfDays = this.datesService.getNamesOfDays();
      
      let y = this.actualDate.getFullYear(), 
          m = this.actualDate.getMonth()
      /*let prev = this.datesService.getPrevMonth(y,m),
          next = this.datesService.getNextMonth(y,m);*/
      //this.loadMonthFirst(prev.year,prev.month);
      this.loadMonth(y,m);
      /*this.loadMonth(next.year,next.month);
      prev = this.getPrevMonth(prev.year,prev.month),
      next = this.getNextMonth(next.year,next.month);
      this.loadMonthFirst(prev.year,prev.month);
      this.loadMonth(next.year,next.month);*/
      this.setActiveMonth(y,m);
  }

  ionViewWillEnter() {
    this.toActiveMonth();
  }

  loadMonth(y,m){
    this.datesService.getMonth(y,m).then((month) => {
      month.active = true;
      this.activeMonths = [month];
      this.months.push(month);
    });
  }

  loadMonthFirst(y,m){
    this.datesService.getMonth(y,m).then((month) => {
      month.active = true;
      let auxMonths = [];
      auxMonths.push(month);
      for(let mo of this.months){
        auxMonths.push(mo);
      }
      this.months = auxMonths;
    });
  }

  slideChanged(){   
      let currentIndex = this.slides.getActiveIndex();
      let previousIndex = this.slides.getPreviousIndex();
      //alert('currentIndex: '+currentIndex+' getActiveIndex(): '+this.slides.getActiveIndex()+' getPreviousIndex(): '+this.slides.getPreviousIndex());
      if(previousIndex > currentIndex){ //Se corrió a mes anterior
        
        let prev = this.datesService.getPrevMonth(this.getActiveMonth().year,this.getActiveMonth().month.number);
        this.setActiveMonth(prev.year,prev.month);
        prev = this.datesService.getPrevMonth(prev.year,prev.month);
        if(!this.isLoaded(prev)){
          this.loadMonthFirst(prev.year,prev.month);
        }
      }
      else{
        let next = this.datesService.getNextMonth(this.getActiveMonth().year,this.getActiveMonth().month.number);
        this.setActiveMonth(next.year,next.month);
        next = this.datesService.getNextMonth(next.year,next.month);
        if(!this.isLoaded(next)){
          this.loadMonth(next.year,next.month);
        }
      }
      this.slides.update();
  }

  isLoaded(param){
    for(let mo of this.months){
      if(mo.year == param.year && mo.number == param.month){
        return true;
      }
    }

    return false;
  }


  setActiveMonth(y,m){
    this.selectedMonth = this.namesOfMonths.find(aux => aux.number == m);
    this.selectedYear = y;    
  }

  getActiveMonth(){
    return {
      'year': this.selectedYear,
      'month': this.selectedMonth
    };
  }

  toActiveMonth(){
    let y = this.getActiveMonth().year;
    let m = this.getActiveMonth().month.number;
    this.loadMonth(y,m);
  }

  toActualMonth(){
    let actual = this.getActualMonth();
    this.loadMonth(actual.year,actual.month);
    this.setActiveMonth(actual.year,actual.month);
  }

  toPrevMonth(){
    let prev = this.datesService.getPrevMonth(this.selectedYear,this.selectedMonth.number);
    this.loadMonth(prev.year,prev.month);
    this.setActiveMonth(prev.year,prev.month);
    //this.slides.slidePrev(500);
  }
  
  toNextMonth(){
    let next = this.datesService.getNextMonth(this.selectedYear,this.selectedMonth.number);
    this.loadMonth(next.year,next.month);
    this.setActiveMonth(next.year,next.month);
    //this.slides.slideNext(500);
  }

  getActualMonth(){
    return {
      'year':this.actualDate.getFullYear(),
      'month':this.actualDate.getMonth()
    };
  }

  agregarEvento(){
    this.eventsService.agregarEvento(EventoPage,MesPage);    
  }
  
  editarEvento(id){
    this.eventsService.editarEvento(EventoPage,MesPage,id);
  }

  verDia(d,m){
    let selectedDay = {
      day: {
        position:d.position,
        number:d.number
      },
      month: {
        number: m.number,
        year: m.year,
        name: m.name
      }
    };
    this.navCtrl.push(DiaPage,{day:selectedDay});
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
