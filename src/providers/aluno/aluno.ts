import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the AlunoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlunoProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }
  public insert(aluno: Aluno){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'INSERT INTO aluno(nome, dataNascimento) VALUES(?,?)';
      let data = [aluno.nome,aluno.dataNascimento];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar insert aluno',e));
    })
    .catch((e) => console.error('Erro ao inserir aluno', e));
  }

  public update(aluno:Aluno){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'UPDATE aluno SET nome = ?, dataNascimento = ? WHERE id = ?';
      let data = [aluno.nome,aluno.dataNascimento, aluno.id];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update aluno',e));
    })
    .catch((e) => console.error('Erro ao atualizar aluno', e));
  }

  public get(id:number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT id, nome, dataNascimento FROM aluno WHERE  id=?';
      let data = [id];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let aluno = new Aluno();
          aluno.id = item.id;
          aluno.nome = item.nome;
          aluno.dataNascimento = item.dataNascimento;

          return aluno;
        }
        return null;
      })
      .catch((e) => console.error('Erro ao executar get aluno', e));
    })
    .catch((e) => console.error('Erro ao pesquisar aluno', e));
  }
  }

  export class Aluno{
  id:number;
  nome:string;
  dataNascimento:number;
  }
