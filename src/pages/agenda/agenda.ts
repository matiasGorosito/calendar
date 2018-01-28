import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventsProvider } from '../../providers/events/events';
import { UsersProvider } from '../../providers/users/users';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-agenda',
  providers: [ EventsProvider, UsersProvider ],
  templateUrl: 'agenda.html',
})
export class AgendaPage {
  items = [
    {
      title: 'Se casa Gus',
      content: 'Gustavo Ochoa se casa. AHHHHH PEROOOOO SIIII',
      icon: 'calendar',
      time: {subtitle: '11/17/2018', title: '21:30'}
    },
    {
      title: 'Se casa Gus',
      content: 'Gustavo Ochoa se casa. AHHHHH PEROOOOO SIIII',
      icon: 'calendar',
      time: {subtitle: 'November', title: '17'}
    },
    {
      title: 'Se casa Gus',
      content: 'Gustavo Ochoa se casa. AHHHHH PEROOOOO SIIII',
      icon: 'calendar',
      time: {subtitle: 'November', title: '17'}
    },
    {
      title: 'Se casa Gus',
      content: 'Gustavo Ochoa se casa. AHHHHH PEROOOOO SIIII',
      icon: 'calendar',
      time: {subtitle: 'November', title: '17'}
    },
    {
      title: 'Se casa Gus',
      content: 'Gustavo Ochoa se casa. AHHHHH PEROOOOO SIIII',
      icon: 'calendar',
      time: {subtitle: 'November', title: '17'}
    },
    {
      title: 'Se casa Gus',
      content: 'Gustavo Ochoa se casa. AHHHHH PEROOOOO SIIII',
      icon: 'calendar',
      time: {subtitle: 'November', title: '17'}
    },
    {
      title: 'Se casa Gus',
      content: 'Gustavo Ochoa se casa. AHHHHH PEROOOOO SIIII',
      icon: 'calendar',
      time: {subtitle: 'November', title: '17'}
    },
  ];

  storage: Storage;
  constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            storage: Storage, 
            public eventsService: EventsProvider,
            public usersService: UsersProvider) {
    this.storage = storage;

    this.usersService.getUserConnected().then((usuario_conectado) => {
      if(usuario_conectado){
        this.usersService.getUser(usuario_conectado).then((data) => {
          this.showEvents(data.eventos);
        });
      }
    });  

  }

  showEvents(eventos){
    for(let data of eventos) {
      this.addItem(data);
    }
  }

  addItem(data){
    var item = {
      title: null,
      content: null,
      icon: null,
      time: {subtitle: null, title: null}
    };
    item.title = data.title;
    item.content = data.content;
    item.icon = data.icon;
    item.time.subtitle = data.mes;
    item.time.title = data.dia; 
    this.items.push(item);
  }

  agregarEvento(page){
    this.eventsService.agregarEvento(page);    
  }

}
