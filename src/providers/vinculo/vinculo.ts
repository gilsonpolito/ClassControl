import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Aluno } from '../aluno/aluno';

@Injectable()
export class VinculoProvider {

  constructor(private dbProvider: DatabaseProvider) {
    console.log('Hello VinculoProvider Provider');
  }

  public get(id:number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT a.login_email, a.nome, a.dataNascimento ' +
      'FROM aluno a, vinculo v, turma t ' +
      'WHERE t.disciplina_id = v.turma_id and a.login_email = v.aluno_login_email and v.turma_id = ?';
      return db.executeSql(sql, [id])
      .then((data: any) => {
        if (data.rows.length > 0){
          let alunos : any[] = [];
          for (let i = 0; i < data.rows.length; i++) {
            let aluno: Aluno = new Aluno();
            aluno.dataNascimento = data.rows.item(i).dataNascimento;
            aluno.login.email = data.rows.item(i).login_email;
            aluno.nome = data.rows.item(i).nome;
            alunos.push(aluno);
          }
          return alunos;
        } else {
          return [];
        }
      })
      .catch((e) => console.error('Erro ao executar get turma', e));
    })
    .catch((e) => console.error('Erro ao pesquisar turma', e));
  }

}
