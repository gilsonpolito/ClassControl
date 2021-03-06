import { Component } from '@angular/core';
import { IonicPage, Events, ToastController} from 'ionic-angular';
import { LoginProvider, Login } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  public login: Login = new Login();

  constructor(private toast: ToastController, private loginProvider: LoginProvider, private events:Events) {
  }

  public autenticar():void{
    this.loginProvider.get(this.login)
    .then((result : Login) => {
      if(result != null){
        this.login = <Login>result;
        this.events.publish('user:login', this.login);
      } else{
        this.toast.create({message: 'Usuário ou senha inválidos!', duration: 3000, position: 'middle' }).present();
      }
    })
    .catch( () => this.toast.create({message: 'Falha ao executar autenticação!', duration: 3000, position: 'middle' }).present());
  }
}
