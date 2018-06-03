import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class ProfessorProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }
  public insert(professor: Professor){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'INSERT INTO professor(login_email, nome, dataAdmissao) VALUES(?,?,?)';
      let data = [professor.email, professor.nome, professor.dataAdmissao];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar insert professor',e));
    })
    .catch((e) => console.error('Erro ao inserir professor', e));
  }

  public update(professor:Professor){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'UPDATE professor SET nome = ?, dataAdmissao = ? WHERE login_email = ?';
      let data = [professor.nome,professor.dataAdmissao, professor.email];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update professor',e));
    })
    .catch((e) => console.error('Erro ao atualizar professor', e));
  }

  public get(email:string){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT login_email, nome, dataAdmissao FROM professor WHERE  login_email=?';
      let data = [email];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let professor = new Professor();
          professor.email = item.login_email;
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
  email:string;
  nome:string;
  dataAdmissao:number;
}
