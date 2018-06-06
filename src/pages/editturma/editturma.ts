import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Turma, TurmaProvider } from '../../providers/turma/turma';
import { Disciplina, DisciplinaProvider } from '../../providers/disciplina/disciplina';
import { Professor, ProfessorProvider } from '../../providers/professor/professor';

@IonicPage()
@Component({
  selector: 'page-editturma',
  templateUrl: 'editturma.html',
})
export class EditturmaPage {

  disciplinas: Disciplina[] = [];
  professores: Professor[] = [];
  turma: Turma = new Turma();
  atualizar: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private disciplinaProvider: DisciplinaProvider,
  private professorProvider: ProfessorProvider,
  private toast: ToastController) {
  }

  ionViewDidLoad() {
    this.disciplinaProvider.getAll()
    .then((result: Disciplina[]) =>{
      this.disciplinas = result;
    })
    .catch(() =>{
      this.toast.create({message: 'Erro ao carregar disciplinas.',duration:3000, position:'middle'}).present();
    });

    this.professorProvider.getAll()
    .then((result: Professor[]) => {
      this.professores = result;
    })
    .catch(() => {
      this.toast.create({message: 'Erro ao carregar professores.',duration:3000, position:'middle'}).present();
    })
  }

}
