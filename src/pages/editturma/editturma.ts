import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Turma } from '../../providers/turma/turma';
import { Disciplina, DisciplinaProvider } from '../../providers/disciplina/disciplina';
import { Professor, ProfessorProvider } from '../../providers/professor/professor';
import { VincularalunosPage } from '../vincularalunos/vincularalunos';

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
      if (this.navParams.data.turma) {
        this.turma = this.navParams.data.turma;
        this.atualizar = true;
      }
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

    ionViewDidLoad() {
    }

    vincularAlunos() {
      for (let i = 0; i < this.disciplinas.length; i++){
          if(this.disciplinas[i].id == this.turma.disciplina.id){
            this.turma.disciplina = this.disciplinas[i];
            break;
          }
      }
      for (let i = 0; i < this.professores.length; i++) {
          if(this.professores[i].login.email == this.turma.professor.login.email){
            this.turma.professor = this.professores[i];
            break;
          }
      }
      this.navCtrl.push(VincularalunosPage, { turma: this.turma });
    }
  }
