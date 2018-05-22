import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the ProfessorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfessorProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }
  public insert(professor: Professor){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'INSERT INTO professor(nome, dataAdmissao) VALUES(?,?)';
      let data = [professor.nome,professor.dataAdmissao];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar insert professor',e));
    })
    .catch((e) => console.error('Erro ao inserir professor', e));
  }

  public update(professor:Professor){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'UPDATE professor SET nome = ?, dataAdmissao = ? WHERE id = ?';
      let data = [professor.nome,professor.dataAdmissao, professor.id];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update professor',e));
    })
    .catch((e) => console.error('Erro ao atualizar professor', e));
  }

  public get(id:number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT id, nome, dataAdmissao FROM professor WHERE  id=?';
      let data = [id];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let professor = new Professor();
          professor.id = item.id;
          professor.nome = item.nome;
          professor.dataAdmissao = item.dataAdmissao;

          return professor;
        }
        return null;
      })
      .catch((e) => console.error('Erro ao executar get professor', e));
    })
    .catch((e) => console.error('Erro ao pesquisar professor', e));
  }
  }

  export class Professor{
  id:number;
  nome:string;
  dataAdmissao:number;
  }
