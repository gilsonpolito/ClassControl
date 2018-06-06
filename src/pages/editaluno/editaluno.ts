import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Aluno, AlunoProvider } from '../../providers/aluno/aluno';

@IonicPage()
@Component({
  selector: 'page-editaluno',
  templateUrl: 'editaluno.html',
})
export class EditalunoPage {
  aluno: Aluno = new Aluno();
  atualizar: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alunoProvider: AlunoProvider, private toast: ToastController) {
    if (this.navParams.data.aluno) {
      this.aluno = this.navParams.data.aluno;
      this.atualizar = true;
    }
  }
  save() {
    this.saveAluno()
    .then(() => {
      this.toast.create({ message: 'Aluno salvo!', duration: 3000, position: 'middle' }).present();
      this.navCtrl.pop();
    })
    .catch(() => {
      this.toast.create({ message: 'Erro ao salvar aluno!', duration: 3000, position: 'middle' }).present();
    });
  }

  private saveAluno() {
    if (this.atualizar) {
      return this.alunoProvider.update(this.aluno);
    } else {
      return this.alunoProvider.insert(this.aluno);
    }
  }
}
