import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Professor, ProfessorProvider } from '../../providers/professor/professor';
import { EditprofessorPage } from '../editprofessor/editprofessor'

@IonicPage()
@Component({
  selector: 'page-listaprofessores',
  templateUrl: 'listaprofessores.html',
})
export class ListaprofessoresPage {

  professores: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
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

  editProfessor(email: string) {
    this.navCtrl.push(EditprofessorPage, { email: email });
  }

  addProfessor() {
    this.navCtrl.push(EditprofessorPage);
  }
}
