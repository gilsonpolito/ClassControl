import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Turma, TurmaProvider } from '../../providers/turma/turma';

@IonicPage()
@Component({
  selector: 'page-vincularalunos',
  templateUrl: 'vincularalunos.html',
})
export class VincularalunosPage {

  turma: Turma;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data.turma) {
      this.turma = this.navParams.data.turma;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VincularalunosPage');
  }

}
