import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListaalunosPage } from '../pages/listaalunos/listaalunos';
import { ListadisciplinasPage } from '../pages/listadisciplinas/listadisciplinas';
import { ListaprofessoresPage } from '../pages/listaprofessores/listaprofessores';
import { ListaturmasPage } from '../pages/listaturmas/listaturmas';
import { LoginPage } from '../pages/login/login';
import { ManternotasfaltasPage } from '../pages/manternotasfaltas/manternotasfaltas';
import { VisualizarnotasfaltasPage } from '../pages/visualizarnotasfaltas/visualizarnotasfaltas';

import { DatabaseProvider } from '../providers/database/database';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;//LoginPage;//HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, dbProvider: DatabaseProvider, public events:Events) {

    events.subscribe('user:login', (perfil) =>{
      this.criarMenu(perfil);
    })

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

  private criarMenu(perfil){
    console.log("Passei aqui ", perfil);

    switch(perfil){
      case 0:
        this.pages = [
            { title: 'Visualizar Notas e Faltas', component: VisualizarnotasfaltasPage }
          ];
        break;
      case 1:
        this.pages = [
            { title: 'Manter Notas e Faltas', component: ManternotasfaltasPage }
          ];
        break;
      case 2:
        this.pages = [
            {title: 'Listar Alunos', component: ListaalunosPage },
            {title: 'Listar Professores', component: ListaprofessoresPage },
            {title: 'Listar Disciplinas', component: ListadisciplinasPage },
            {title: 'Listar Turmas', component: ListaturmasPage }
          ];
        break;
    }
    this.pages.push({title: 'Logout', component: LoginPage });
  }

  private openHomePage(splashScreen: SplashScreen){
    splashScreen.hide();
    this.rootPage = LoginPage
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
