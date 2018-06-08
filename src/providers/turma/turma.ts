import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Disciplina } from '../disciplina/disciplina';
import { Professor } from '../professor/professor';
import { Aluno } from '../aluno/aluno';

@Injectable()
export class TurmaProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }

  public insert(turma: Turma){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'INSERT INTO turma(disciplina_id, professor_id) VALUES(?,?)';
      let data = [turma.disciplina.id,turma.professor.login.email];
      db.transaction(tx => {
        tx.start();
        tx.executeSql(sql,data,()=>{
          sql = "select last_insert_rowid()";
          let idGerado;
          tx.executeSql(sql,[]), (d) =>{
            idGerado = d.rows.item(0).value;
            sql = 'INSERT INTO vinculo(turma_id, aluno_id) VALUES(?,?)';

            for (let i = 0; i < turma.alunos.length; i++) {
              data = [idGerado,turma.alunos[i].login.email];
              tx.executeSql(sql,data);
            }
          }, (e) =>{
            console.error('Erro ao recuperar o idGerado para a turma ', e);
          }
        },(e)=>{
          console.error('Erro ao executar insert turma',e)
        });
      });
    })
    .catch((e) => console.error('Erro ao inserir turma', e));
  }

  public update(turma:Turma){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{

      let comandos: any[] = [];

      comandos.push(['UPDATE turma SET disciplina_id = ?, professor_login_email = ? WHERE id = ?',[turma.disciplina.id,turma.professor.login.email, turma.id]]);
      comandos.push(['DELETE FROM vinculo WHERE turma_id = ?',[turma.id]]);
      for (let i = 0; i < turma.alunos.length; i++) {
        comandos.push(['INSERT INTO vinculo(turma_id, aluno_login_email) VALUES(?,?)',[turma.id, turma.alunos[i].login.email]]);
      }

      db.sqlBatch(
        comandos
      )
      .catch((e) => console.error('Erro ao atualizar turma', e));
    });
  }

  public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT d.id idDisc, d.nome nomeDisciplina, d.cargaHoraria, p.nome nomeProfessor, p.login_email, t.id ' +
      'FROM disciplina d, professor p, turma t ' +
      'WHERE t.disciplina_id = d.id and t.professor_login_email = p.login_email';
      return db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0){
          let turmas : any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            let turma = new Turma();
            let item = data.rows.item(i);
            turma.disciplina.id = item.idDisc;
            turma.disciplina.nome = item.nomeDisciplina;
            turma.disciplina.cargaHoraria = item.cargaHoraria;
            turma.professor.nome = item.nomeProfessor;
            turma.professor.login.email = item.login_email;
            turma.id = item.id;
            turmas.push(turma);
          }
          return turmas;
        } else {
          return [];
        }
      })
      .catch((e) => console.error('Erro ao executar get turma', e));
    })
    .catch((e) => console.error('Erro ao pesquisar turma', e));
  }
}

export class Turma{
  id:number;
  disciplina:Disciplina = new Disciplina();
  professor:Professor = new Professor();
  alunos:[Aluno];
}
