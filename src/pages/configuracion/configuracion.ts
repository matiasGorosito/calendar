import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-configuracion',
  providers: [ UsersProvider ],
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public usersService: UsersProvider,) {
  }

  logOut(){
    this.usersService.logOut();
    this.navCtrl.setRoot(LoginPage);
  }

  deleteUser(){
    this.usersService.deleteUser();
    this.navCtrl.setRoot(LoginPage);
  }
}
