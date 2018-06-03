import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Professor, ProfessorProvider } from '../../providers/professor/professor';

@IonicPage()
@Component({
  selector: 'page-editprofessor',
  templateUrl: 'editprofessor.html',
})
export class EditprofessorPage {

  professor: Professor;

  constructor(public navCtrl: NavController, public navParams: NavParams, private professorProvider: ProfessorProvider, private toast: ToastController) {
    this.professor = new Professor();
    console.log(this.navParams.data);
    if (this.navParams.data.email) {
      console.log(this.navParams.data.email);
      this.professorProvider.get(this.navParams.data.email)
        .then((result: any) => {
          console.log('Apos select');
          console.log(result);
          this.professor.nome = result.nome;
          this.professor.email = result.email;
          this.professor.dataAdmissao = result.dataAdmissao;
          this.professor.foto = result.foto;
        })
        .catch((e) => console.log('Erro ao selecionar professor ' + e));
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
      if (this.professor.email) {
        return this.professorProvider.update(this.professor);
      } else {
        return this.professorProvider.insert(this.professor);
      }
    }

}
