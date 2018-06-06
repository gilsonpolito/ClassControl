import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Aluno, AlunoProvider } from '../../providers/aluno/aluno';
import { EditalunoPage } from '../editaluno/editaluno'

@IonicPage()
@Component({
  selector: 'page-listaalunos',
  templateUrl: 'listaalunos.html',
})
export class ListaalunosPage {
  alunos: Aluno[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alunoProvider: AlunoProvider) {
    }

    ionViewDidEnter() {
      this.getAll();
    }
    getAll() {
      this.alunoProvider.getAll()
      .then((result: any[]) => {
        this.alunos = result;
      });
    }

    editAluno(aluno: Aluno) {
      this.navCtrl.push(EditalunoPage, { aluno: aluno });
    }

    addAluno() {
      this.navCtrl.push(EditalunoPage);
    }
  }
