import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Disciplina } from '../disciplina/disciplina';
import { Professor } from '../professor/professor';
import { Aluno } from '../aluno/aluno';
/*
  Generated class for the TurmaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TurmaProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }
  /*public insert(turma: Turma){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'INSERT INTO turma(nome, dataNascimento) VALUES(?,?)';
      let data = [turma.nome,turma.dataNascimento];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar insert turma',e));
    })
    .catch((e) => console.error('Erro ao inserir turma', e));
  }

  public update(turma:Turma){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'UPDATE turma SET nome = ?, dataNascimento = ? WHERE id = ?';
      let data = [turma.nome,turma.dataNascimento, turma.id];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update turma',e));
    })
    .catch((e) => console.error('Erro ao atualizar turma', e));
  }

  public get(id:number){
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
