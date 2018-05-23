import { Component } from '@angular/core';
import { IonicPage, NavController , Events} from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { VisualizarnotasfaltasPage } from '../visualizarnotasfaltas/visualizarnotasfaltas'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 enum Logins{
   ALUNO,
   PROFESSOR,
   INSTITUICAO,
 }

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  public loginAluno:Logins = Logins.ALUNO;
  public loginProfessor:Logins = Logins.PROFESSOR;
  public loginInstituicao:Logins = Logins.INSTITUICAO;

  constructor(public navCtrl: NavController, public perfil: LoginProvider, public events:Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(login:Logins):void{
    console.log("Fazer a lógica de login para " +  login);
    //direcionar para a home e inserir parametro de perfil
    this.events.publish('user:login', login);
    this.navCtrl.setRoot(VisualizarnotasfaltasPage);
  }
}
