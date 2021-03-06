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
    'eventos':null
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

  getNewID(eventos){
    return eventos != null ? eventos.length : 0;
  }

  saveEvent(evento){
    console.log(JSON.stringify(evento));
    try{
      this.getUserConnected().then((usuario) => {
        this.getUser(usuario).then((data) => {
          evento.id = this.getNewID(data.eventos);
          if(data.eventos != null){
            data.eventos.push(evento);
          }
          else{
            var eventos = [evento];
            data.eventos = eventos;
          }

          this.storage.set(usuario,data);
        });
      });
    }
    catch(e){
      console.log(e);
      throw new Error("Error al grabar el evento.");
    }
  }  

  changeEvent(evento,oper){
    return this.getUserConnectedData().then((data) => {
              return data;
          }).then((data) => {
              var auxEvents = [];
              for(let auxEvent of data.eventos){
                if(auxEvent.id == evento.id){
                  if(oper == 'edit'){
                    auxEvents.push(evento);
                  }
                }
                else{
                  auxEvents.push(auxEvent);
                }
              } 
              
            data.eventos = auxEvents;

            return this.storage.set(data.usuario,data);      
          });
  }

  deleteUser(){
    this.getUserConnected().then((usuario) => {
      this.storage.remove(usuario);
      this.logOut();
    });    
  }

  getUserEvents(){
    return this.getUserConnectedData().then((data) =>{
        return data.eventos;
      });
  }  

  getUserEventsByDateRange(from,to){
    return this.getUserEvents().then((events) => {
      if(events == null){ return []};
      return events.filter(e => this.parseDate(e.fecha_inicio) >= from && this.parseDate(e.fecha_inicio) <= to);
    });
  }

  getUserEventsByDate(date){
    return this.getUserEvents().then((events) => {
      if(events == null){ return []};
      return events.filter(e => this.getDateWithOutTime(this.parseDate(e.fecha_inicio)) == date);
    });
  }

  parseDate(string){
    return new Date(Date.parse(string));
  }

  getDateWithOutTime(date){
    let aux = date;
    aux.setUTCHours(0,0,0,0);
    return aux;
  }

  getUserConnectedData(){
    return this.getUserConnected().then((usuario_conectado) => {
        return this.getUser(usuario_conectado);
      });
  }

  findUserEvent(id){
    return this.getUserEvents().then((data) =>{
        return data.find(evento => evento.id == id);
      });
  }

  deleteUserEvent(evento){
    evento.activo = false;
    this.changeEvent(evento,'del');
  }
}
