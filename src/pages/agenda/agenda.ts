import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-agenda',
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
  ];

  storage: Storage;
  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage) {
    this.storage = storage;

    this.storage.get("eventos").then((eventos) => {
      if(eventos){
        for(let data of eventos) {
          this.addItem(data);
        }
      }
    });

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

}
