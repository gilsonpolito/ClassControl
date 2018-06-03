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
      let data = [turma.disciplina.id,turma.professor.id];
      db.transaction(tx => {
        tx.start();
        tx.executeSql(sql,data,()=>{
          sql = "select last_insert_rowid()";
          let idGerado;
          tx.executeSql(sql,[]), (d) =>{
            idGerado = d.rows.item(0).value;
            sql = 'INSERT INTO vinculo(turma_id, aluno_id) VALUES(?,?)';

            for (let i = 0; i < turma.alunos.length; i++) {
              data = [idGerado,turma.alunos[i].id];
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
      let sql = 'UPDATE turma SET disciplina_id = ?, professor_id = ? WHERE id = ?';
      let data = [turma.disciplina.id,turma.professor.id, turma.id];
      db.transaction(tx => {
        tx.executeSql(sql,data,()=>{
          sql = 'DELETE FROM vinculo WHERE turma_id = ?';
          data = [turma.id];
          tx.executeSql(sql,data);
          sql = 'INSERT INTO vinculo(turma_id, aluno_id) VALUES(?,?)';
          for (let i = 0; i < turma.alunos.length; i++) {
            data = [turma.id,turma.alunos[i].id];
            tx.executeSql(sql,data);
          }
        },(e)=>{
          console.error('Erro ao executar atualização dos vinculos',e)
        });
      });
    })
    .catch((e) => console.error('Erro ao atualizar turma', e));
  }

  /*public get(id:number){
  return this.dbProvider.getDB()
  .then((db: SQLiteObject) => {
  let sql = 'SELECT id, nome, dataNascimento FROM turma WHERE  id=?';
  let data = [id];
  return db.executeSql(sql, data)
  .then((data: any) => {
  if (data.rows.length > 0){
  let item = data.rows.item(0);
  let turma = new Turma();
  turma.id = item.id;
  turma.nome = item.nome;
  turma.dataNascimento = item.dataNascimento;

  return turma;
}
return null;
})
.catch((e) => console.error('Erro ao executar get turma', e));
})
.catch((e) => console.error('Erro ao pesquisar turma', e));
}*/
}

export class Turma{
  id:number;
  disciplina:Disciplina;
  professor:Professor;
  alunos:[Aluno];
}
