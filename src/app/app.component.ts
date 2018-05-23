import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;//LoginPage;//HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, dbProvider: DatabaseProvider) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

    platform.ready().then(() =>{
      console.log('iniciou');
      statusBar.styleDefault();
      dbProvider.createDatabase()
      .then(() => {
        this.openHomePage(splashScreen);
      })
      .catch(() => {
        this.openHomePage(splashScreen);
      });
    });
  }

  private openHomePage(splashScreen: SplashScreen){
    splashScreen.hide();
    this.rootPage = LoginPage
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
