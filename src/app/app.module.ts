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

import { Calendar } from '@ionic-native/calendar';

import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';

import { EventsProvider } from '../providers/events/events';
import { UsersProvider } from '../providers/users/users';
import { AlertsProvider } from '../providers/alerts/alerts';
import { DatesProvider } from '../providers/dates/dates';

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
    Calendar,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventsProvider,
    UsersProvider,
    AlertsProvider,
    DatesProvider
  ]
})
export class AppModule {}
