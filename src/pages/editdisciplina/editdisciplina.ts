import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Disciplina, DisciplinaProvider } from '../../providers/disciplina/disciplina';

@IonicPage()
@Component({
  selector: 'page-editdisciplina',
  templateUrl: 'editdisciplina.html',
})
export class EditdisciplinaPage {
  disciplina: Disciplina = new Disciplina();
  atualizar: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private disciplinaProvider: DisciplinaProvider, private toast: ToastController) {
    if (this.navParams.data.disciplina) {
        this.disciplina = this.navParams.data.disciplina;
        this.atualizar = true;
    }
  }
  save() {
    this.saveDisciplina()
    .then(() => {
      this.toast.create({ message: 'Disciplina salva!', duration: 3000, position: 'middle' }).present();
      this.navCtrl.pop();
    })
    .catch(() => {
      this.toast.create({ message: 'Erro ao salvar disciplina!', duration: 3000, position: 'middle' }).present();
    });
  }

  private saveDisciplina() {
    if (this.atualizar) {
      return this.disciplinaProvider.update(this.disciplina);
    } else {
      return this.disciplinaProvider.insert(this.disciplina);
    }
  }
}
