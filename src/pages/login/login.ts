import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  private login():void{
    console.log("Fazer a lógica de login")
  }

  public loginAluno():void{
    this.login();
    console.log("Login aluno");
  }

  public loginProfessor():void{
    this.login();
    console.log("Login professor");
  }

  public loginInstituicao():void{
    this.login();
    console.log("Login instituição");
  }

}
