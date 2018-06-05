import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { EnumLogin } from '../../app/app.component';

@Injectable()
export class ProfessorProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }
  public insert(professor: Professor){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      db.sqlBatch([
        ['INSERT INTO login(email, password, perfil) VALUES(?,?,?)',[professor.email, professor.senha, EnumLogin.PROFESSOR]],
        ['INSERT INTO professor(login_email, nome, dataAdmissao, foto) VALUES(?,?,?,?)',[professor.email, professor.nome, new Date(Date.parse(professor.dataAdmissao)), professor.foto]]
      ])
      .catch((e) => console.error('Erro ao inserir professor', e));
    });
  }

  public update(professor:Professor){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      console.log('Atualizando...' + new Date(Date.parse(professor.dataAdmissao)));

      let sql = 'UPDATE professor SET nome = ?, dataAdmissao = ?, foto = ? WHERE login_email = ?';
      let data = [professor.nome,  new Date(Date.parse(professor.dataAdmissao)), professor.foto, professor.email];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update professor',e));
    })
    .catch((e) => console.error('Erro ao atualizar professor', e));
  }

  public get(email:string){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT login_email, nome, dataAdmissao, foto FROM professor WHERE  login_email=?';
      let data = [email];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let professor = new Professor();
          professor.email = item.login_email;
          professor.nome = item.nome;
          professor.dataAdmissao = new Date(item.dataAdmissao).toISOString();
          professor.foto = item.foto;

          return professor;
        }
        return null;
      })
      .catch((e) => console.error('Erro ao executar get professor', e));
    })
    .catch((e) => console.error('Erro ao pesquisar professor', e));
  }

  public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT login_email, nome, dataAdmissao, foto FROM professor';
      let data = [];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let professores: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            let professor = new Professor();
            professor.nome = data.rows.item(i).nome;
            professor.email = data.rows.item(i).login_email;
            professor.dataAdmissao = new Date(data.rows.item(i).dataAdmissao).toISOString();
            professor.foto = data.rows.item(i).foto;
            professores.push(professor);
          }
          return professores;
        } else {
          return [];
        }
      })
      .catch((e) => console.error('Erro ao executar getAll professor', e));
    })
    .catch((e) => console.error('Erro ao pesquisar professores', e));
  }
}

export class Professor{
  email:string;
  senha:string;
  nome:string;
  dataAdmissao:string;
  foto:string;
}
