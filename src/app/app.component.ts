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
import { Login } from '../providers/login/login';
import { AlunoProvider, Aluno } from '../providers/aluno/aluno';
import { ProfessorProvider, Professor } from '../providers/professor/professor';
import { InstituicaoProvider, Instituicao } from '../providers/instituicao/instituicao';

export enum EnumLogin{
  ALUNO = 0,
  PROFESSOR = 1,
  INSTITUICAO = 2,
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  pages: Array<{title: string, component: any}>;

  pageLogout: {title: string, component: any} = {title:'Logout', component: LoginPage};

  usuarioLogado: any = null;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public databaseProvider: DatabaseProvider,
    private alunoProvider: AlunoProvider,
    private professorProvider: ProfessorProvider,
    private instituicaoProvider: InstituicaoProvider,
    public events:Events) {

      events.subscribe('user:login', (usuario: Login) =>{
        this.criarMenu(usuario);
      })

      platform.ready().then(() =>{
        statusBar.styleDefault();
        databaseProvider.createDatabase()
        .then(() => {
          this.openHomePage(splashScreen);
        })
        .catch(() => {
          this.openHomePage(splashScreen);
        });
      });
    }

    private criarMenu(perfil:Login){
      switch(perfil.perfil){
        case EnumLogin.ALUNO:
        this.pages = [
          { title: 'Visualizar Notas e Faltas', component: VisualizarnotasfaltasPage }
        ];
        this.alunoProvider.get(perfil.email)
        .then((result : any) => {
          if (result instanceof Aluno){
            this.usuarioLogado = <Aluno>result;
            this.nav.setRoot(VisualizarnotasfaltasPage);
          }
        })
        .catch((e) => console.log('Falha ao recuperar informações da instituição: ' + e));
        break;
        case EnumLogin.PROFESSOR:
        this.pages = [
          { title: 'Manter Notas e Faltas', component: ManternotasfaltasPage }
        ];
        this.professorProvider.get(perfil.email)
        .then((result : any) => {
          if (result instanceof Professor){
            this.usuarioLogado = <Professor>result;
            this.nav.setRoot(ManternotasfaltasPage);
          }
        })
        .catch((e) => console.log('Falha ao recuperar informações da instituição: ' + e));
        break;
        case EnumLogin.INSTITUICAO:
        this.pages = [
          {title: 'Listar Alunos', component: ListaalunosPage },
          {title: 'Listar Professores', component: ListaprofessoresPage },
          {title: 'Listar Disciplinas', component: ListadisciplinasPage },
          {title: 'Listar Turmas', component: ListaturmasPage }
        ];
        this.instituicaoProvider.get(perfil.email)
        .then((result : any) => {
          if (result instanceof Instituicao){
            this.usuarioLogado = <Instituicao>result;
            this.nav.setRoot(ListaturmasPage);
          }
        })
        .catch((e) => console.log('Falha ao recuperar informações da instituição: ' + e));
        break;
      }
    }

    private openHomePage(splashScreen: SplashScreen){
      splashScreen.hide();
      this.rootPage = LoginPage
    }

    openPage(page) {
      this.nav.setRoot(page.component);
    }
  }
