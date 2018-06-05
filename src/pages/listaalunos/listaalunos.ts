import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Aluno, AlunoProvider } from '../../providers/aluno/aluno';
import { EditalunoPage } from '../editaluno/editaluno'

@IonicPage()
@Component({
  selector: 'page-listaalunos',
  templateUrl: 'listaalunos.html',
})
export class ListaalunosPage {
  alunos: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
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

    editAluno(email: string) {
      this.navCtrl.push(EditalunoPage, { email: email });
    }

    addAluno() {
      this.navCtrl.push(EditalunoPage);
    }
  }
