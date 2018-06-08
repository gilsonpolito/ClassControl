import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    private turmaProvider: TurmaProvider,
    private toast: ToastController) {
    }

    ionViewDidEnter() {
      this.getAll();
    }
    getAll() {
      this.turmaProvider.getAll()
      .then((result: Turma[]) => {
        this.turmas = result;
      });
    }

    editTurma(turma: Turma) {
      this.navCtrl.push(EditturmaPage, { turma: turma });
    }

    addTurma() {
      //this.navCtrl.push(EditturmaPage);
      this.toast.create({message: 'Inserção de turma não implementada',duration:3000, position:'middle'}).present();
    }
  }
