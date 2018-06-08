import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Turma, TurmaProvider } from '../../providers/turma/turma';
import { Aluno, AlunoProvider } from '../../providers/aluno/aluno';
import { VinculoProvider } from '../../providers/vinculo/vinculo';

@IonicPage()
@Component({
  selector: 'page-vincularalunos',
  templateUrl: 'vincularalunos.html',
})
export class VincularalunosPage {

  turma: Turma;
  alunos: any[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private toast:ToastController,
    private alunoProvider:AlunoProvider,
    vinculoProvider:VinculoProvider,
    private turmaProvider:TurmaProvider) {
      if (this.navParams.data.turma) {
        this.turma = this.navParams.data.turma;
        vinculoProvider.get(this.turma.id).then((result:[Aluno]) => {
        this.turma.alunos = result;
      }).catch(() =>{

      });

    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VincularalunosPage');
    this.alunoProvider.getAll()
    .then((result: Aluno[]) => {
      this.fudeu(result);
    })
    .catch(() =>{
      this.toast.create({message: 'Erro.',duration:3000, position:'middle'}).present();
    })
  }

  fudeu(result){
    let inseriu:boolean;
    for (let i = 0; i < result.length; i++) {
      inseriu = false;
      for (let j = 0; j < this.turma.alunos.length; j++) {
        if(this.turma.alunos[j].login.email == result[i].login.email){
          inseriu = true;
          let x = ({aluno: result[i], checked: true});
          this.alunos.push(x);
          break;
        }
      }
      if(!inseriu){
        this.alunos.push({aluno: result[i], checked: false});
      }
    }
  }

  salvar(){

    this.turma.alunos.length = 0;

    for (let i = 0; i < this.alunos.length; i++) {
      if(this.alunos[i].checked){
        this.turma.alunos.push(this.alunos[i].aluno);
      }
    }
    this.turmaProvider.update(this.turma).then(() =>{
      this.navCtrl.popToRoot();
      this.toast.create({message: 'Salvo.',duration:3000, position:'middle'}).present();
    })
    .catch((e) => {
      this.toast.create({message: 'Erro ao salvar turma ' + e ,duration:3000, position:'middle'}).present();
    })
  }
}
