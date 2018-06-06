import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

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
      let sql = 'UPDATE disciplina SET nome = ?, cargaHoraria = ? WHERE id = ?';
      let data = [disciplina.nome,disciplina.cargaHoraria, disciplina.id];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update disciplina',e));
    })
    .catch((e) => console.error('Erro ao atualizar disciplina', e));
  }

  public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT id, nome, cargaHoraria FROM disciplina';
      return db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0){
          let disciplinas: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            let disciplina = new Disciplina();
            disciplina.id = data.rows.item(i).id;
            disciplina.nome = data.rows.item(i).nome;
            disciplina.cargaHoraria = data.rows.item(i).cargaHoraria;
            disciplinas.push(disciplina);
          }
          return disciplinas;
        } else {
          return [];
        }
      })
      .catch((e) => console.error('Erro ao executar getAll disciplina', e));
    })
    .catch((e) => console.error('Erro ao pesquisar disciplinas', e));
  }
}

export class Disciplina{
  id:number;
  nome:string;
  cargaHoraria:number;
}
