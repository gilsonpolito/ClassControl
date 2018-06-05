import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Disciplina, DisciplinaProvider } from '../../providers/disciplina/disciplina';
import { EditdisciplinaPage } from '../editdisciplina/editdisciplina';

@IonicPage()
@Component({
  selector: 'page-listadisciplinas',
  templateUrl: 'listadisciplinas.html',
})
export class ListadisciplinasPage {
  disciplinas: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    private disciplinaProvider: DisciplinaProvider) {
    }

    ionViewDidEnter() {
      this.getAll();
    }
    getAll() {
      this.disciplinaProvider.getAll()
      .then((result: any[]) => {
        this.disciplinas = result;
      });
    }

    editDisciplina(id: number) {
      this.navCtrl.push(EditdisciplinaPage, { id: id });
    }

    addDisciplina() {
      this.navCtrl.push(EditdisciplinaPage);
    }
  }
