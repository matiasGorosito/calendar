import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AgendaPage } from '../pages/agenda/agenda';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { DiaPage } from '../pages/dia/dia';
import { MesPage } from '../pages/mes/mes';
import { EventoPage } from '../pages/evento/evento';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { DatePicker } from '@ionic-native/date-picker';

import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';

import { EventsProvider } from '../providers/events/events';
import { UsersProvider } from '../providers/users/users';
import { AlertsProvider } from '../providers/alerts/alerts';

@NgModule({
  declarations: [
    MyApp,
    AgendaPage,
    ConfiguracionPage,
    DiaPage,
    MesPage,
    EventoPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    LoginPage,
    RegistroPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AgendaPage,
    ConfiguracionPage,
    DiaPage,
    MesPage,
    EventoPage,
    LoginPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Storage,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventsProvider,
    UsersProvider,
    AlertsProvider
  ]
})
export class AppModule {}
