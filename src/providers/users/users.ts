import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {
  users;
  storage: Storage;
  newUser = {
    'usuario':null,
    'password':null,
    'nombre':null,
    'apellido':null,
    'eventos':[]
  };

  constructor(storage: Storage) {
    this.storage = storage;
  }

  getUser(usuario){
    return this.storage.get(usuario);
  }

  createUser(usuario,userData){
    var data = this.newUser;
    data.usuario = userData.usuario;
    data.password = userData.password;
    data.nombre = userData.nombre;
    data.apellido = userData.apellido;

    this.storage.set(usuario,data);
  }
  
  getUserConnected(){
    return this.storage.get("usuario_conectado");
  }

  setUserConnected(usuario){
    this.storage.set('usuario_conectado',usuario);
  }

  logOut(){
    this.storage.remove('usuario_conectado');
  }

  saveEvent(evento){
    this.getUserConnected().then((usuario) => {
      this.getUser(usuario).then((data) => {
        data.eventos.push(evento);
        this.storage.set(usuario,data);
      });
    });
  }  
}
