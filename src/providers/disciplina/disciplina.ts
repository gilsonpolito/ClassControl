import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the DisciplinaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DisciplinaProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }
  public insert(disciplina: Disciplina){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'INSERT INTO disciplina(nome, cargaHoraria) VALUES(?,?)';
      let data = [disciplina.nome,disciplina.cargaHoraria];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar insert disciplina',e));
    })
    .catch((e) => console.error('Erro ao inserir disciplina', e));
  }

  public update(disciplina:Disciplina){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'UPDATE disciplina SET nome = ?, cargaHoraria = ? WHERE email = ?';
      let data = [disciplina.nome,disciplina.cargaHoraria, disciplina.id];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update disciplina',e));
    })
    .catch((e) => console.error('Erro ao atualizar disciplina', e));
  }

  public get(id:number){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT id, nome, cargaHoraria FROM disciplina WHERE  id=?';
      let data = [id];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let disciplina = new Disciplina();
          disciplina.id = item.id;
          disciplina.nome = item.nome;
          disciplina.cargaHoraria = item.cargaHoraria;

          return disciplina;
        }
        return null;
      })
      .catch((e) => console.error('Erro ao executar get disciplina', e));
    })
    .catch((e) => console.error('Erro ao pesquisar disciplina', e));
  }
  }

  export class Disciplina{
  id:number;
  nome:string;
  cargaHoraria:number;
  }
