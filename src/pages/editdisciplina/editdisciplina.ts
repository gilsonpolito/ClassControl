import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Disciplina, DisciplinaProvider } from '../../providers/disciplina/disciplina';

@IonicPage()
@Component({
  selector: 'page-editdisciplina',
  templateUrl: 'editdisciplina.html',
})
export class EditdisciplinaPage {
  disciplina: Disciplina;
  atualizar: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private disciplinaProvider: DisciplinaProvider, private toast: ToastController) {
    this.disciplina = new Disciplina();
    if (this.navParams.data.id) {
      this.disciplinaProvider.get(this.navParams.data.id)
      .then((result: any) => {
        this.disciplina.nome = result.nome;
        this.disciplina.id = result.id;
        this.disciplina.cargaHoraria = result.cargaHoraria;
        this.atualizar = true;
      })
      .catch((e) => console.log('Erro ao selecionar disciplina ' + e));
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
