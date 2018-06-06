import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Professor, ProfessorProvider } from '../../providers/professor/professor';

@IonicPage()
@Component({
  selector: 'page-editprofessor',
  templateUrl: 'editprofessor.html',
})
export class EditprofessorPage {

  professor: Professor = new Professor();
  atualizar: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private professorProvider: ProfessorProvider, private toast: ToastController) {
    if (this.navParams.data.professor) {
      this.professor = this.navParams.data.professor;
      this.atualizar = true;
    }
  }
  save() {
    this.saveProfessor()
    .then(() => {
      this.toast.create({ message: 'Professor salvo!', duration: 3000, position: 'middle' }).present();
      this.navCtrl.pop();
    })
    .catch(() => {
      this.toast.create({ message: 'Erro ao salvar professor!', duration: 3000, position: 'middle' }).present();
    });
  }

  private saveProfessor() {
    if (this.atualizar) {
      return this.professorProvider.update(this.professor);
    } else {
      return this.professorProvider.insert(this.professor);
    }
  }
}
