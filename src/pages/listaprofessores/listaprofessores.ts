import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Professor, ProfessorProvider } from '../../providers/professor/professor';
import { EditprofessorPage } from '../editprofessor/editprofessor'

@IonicPage()
@Component({
  selector: 'page-listaprofessores',
  templateUrl: 'listaprofessores.html',
})
export class ListaprofessoresPage {

  professores: Professor[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private professorProvider: ProfessorProvider) {
  }

  ionViewDidEnter() {
    this.getAll();
  }
  getAll() {
    this.professorProvider.getAll()
      .then((result: any[]) => {
        this.professores = result;
      });
  }

  editProfessor(professor: Professor) {
    this.navCtrl.push(EditprofessorPage, { professor: professor });
  }

  addProfessor() {
    this.navCtrl.push(EditprofessorPage);
  }
}
