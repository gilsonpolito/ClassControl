import { Component } from '@angular/core';
import { IonicPage, Events, ToastController} from 'ionic-angular';
import { LoginProvider, Login } from '../../providers/login/login';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  public usuario: string = "";
  public senha: string = ""

  constructor(private toast: ToastController, private loginProvider: LoginProvider, private events:Events) {
  }

  public login():void{
    let login = new Login();
    login.email = this.usuario;
    login.password = this.senha;
    this.loginProvider.get(login)
    .then((result : any) => {
      if (result instanceof Login){
        login = <Login>result;
        this.events.publish('user:login', login);
      }
      else{
        this.toast.create({message: 'Usuário ou senha inválidos!', duration: 3000, position: 'middle' }).present();
      }
    })
    .catch((e) => this.toast.create({message: 'Falha ao realizar login ' + e, duration: 3000, position: 'middle' }).present());
  }
}
