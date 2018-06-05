import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Aluno, AlunoProvider } from '../../providers/aluno/aluno';

@IonicPage()
@Component({
  selector: 'page-editaluno',
  templateUrl: 'editaluno.html',
})
export class EditalunoPage {
  aluno: Aluno;
  atualizar: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alunoProvider: AlunoProvider, private toast: ToastController) {
    this.aluno = new Aluno();
    if (this.navParams.data.email) {
      this.alunoProvider.get(this.navParams.data.email)
      .then((result: any) => {
        this.aluno.nome = result.nome;
        this.aluno.email = result.email;
        this.aluno.dataNascimento = result.dataNascimento;
        this.aluno.foto = result.foto;
        this.atualizar = true;
      })
      .catch((e) => console.log('Erro ao selecionar aluno ' + e));
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
