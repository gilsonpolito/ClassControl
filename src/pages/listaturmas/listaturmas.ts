import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Turma, TurmaProvider } from '../../providers/turma/turma';
import { EditturmaPage } from '../editturma/editturma'

@IonicPage()
@Component({
  selector: 'page-listaturmas',
  templateUrl: 'listaturmas.html',
})
export class ListaturmasPage {
  turmas: Turma[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private turmaProvider: TurmaProvider) {
    }

    ionViewDidEnter() {
      this.getAll();
    }
    getAll() {
      this.turmaProvider.getAll()
      .then((result: any[]) => {
        this.turmas = result;
      });
    }

    editTurma(turma: Turma) {
      this.navCtrl.push(EditturmaPage, { turma: turma });
    }

    addTurma() {
      this.navCtrl.push(EditturmaPage);
    }
  }
