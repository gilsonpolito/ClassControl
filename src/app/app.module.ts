import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListaalunosPage } from '../pages/listaalunos/listaalunos';
import { ListadisciplinasPage } from '../pages/listadisciplinas/listadisciplinas';
import { ListaprofessoresPage } from '../pages/listaprofessores/listaprofessores';
import { ListaturmasPage } from '../pages/listaturmas/listaturmas';
import { LoginPage } from '../pages/login/login';
import { ManternotasfaltasPage } from '../pages/manternotasfaltas/manternotasfaltas';
import { VisualizarnotasfaltasPage } from '../pages/visualizarnotasfaltas/visualizarnotasfaltas';
import { EditprofessorPage } from '../pages/editprofessor/editprofessor';
import { EditalunoPage } from '../pages/editaluno/editaluno';
import { EditdisciplinaPage } from '../pages/editdisciplina/editdisciplina';
import { EditturmaPage } from '../pages/editturma/editturma';
import { VincularalunosPage } from '../pages/vincularalunos/vincularalunos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';

import { SQLite } from '@ionic-native/sqlite'
import { LoginProvider } from '../providers/login/login';
import { InstituicaoProvider } from '../providers/instituicao/instituicao';
import { DisciplinaProvider } from '../providers/disciplina/disciplina';
import { ProfessorProvider } from '../providers/professor/professor';
import { AlunoProvider } from '../providers/aluno/aluno';
import { TurmaProvider } from '../providers/turma/turma';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    ListaalunosPage,
    ListadisciplinasPage,
    ListaprofessoresPage,
    ListaturmasPage,
    LoginPage,
    ManternotasfaltasPage,
    VisualizarnotasfaltasPage,
    EditprofessorPage,
    EditalunoPage,
    EditdisciplinaPage,
    EditturmaPage,
    VincularalunosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListaalunosPage,
    ListadisciplinasPage,
    ListaprofessoresPage,
    ListaturmasPage,
    LoginPage,
    ManternotasfaltasPage,
    VisualizarnotasfaltasPage,
    EditprofessorPage,
    EditalunoPage,
    EditdisciplinaPage,
    EditturmaPage,
    VincularalunosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    LoginProvider,
    InstituicaoProvider,
    DisciplinaProvider,
    ProfessorProvider,
    AlunoProvider,
    TurmaProvider,
    Camera
  ]
})
export class AppModule {}
