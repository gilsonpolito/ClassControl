import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { EnumLogin } from '../../app/app.component';
import { Login } from '../login/login';

@Injectable()
export class ProfessorProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }
  public insert(professor: Professor){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      db.sqlBatch([
        ['INSERT INTO login(email, password, perfil, foto) VALUES(?,?,?,?)',[professor.login.email, professor.login.password, EnumLogin.PROFESSOR, null]],
        ['INSERT INTO professor(login_email, nome, dataAdmissao) VALUES(?,?,?)',[professor.login.email, professor.nome, new Date(Date.parse(professor.dataAdmissao))]]
      ])
      .catch((e) => console.error('Erro ao inserir professor', e));
    });
  }

  public update(professor:Professor){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      console.log('Atualizando...' + new Date(Date.parse(professor.dataAdmissao)));

      let sql = 'UPDATE professor SET nome = ?, dataAdmissao = ? WHERE login_email = ?';
      let data = [professor.nome,  new Date(Date.parse(professor.dataAdmissao)), professor.login.email];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update professor',e));
    })
    .catch((e) => console.error('Erro ao atualizar professor', e));
  }

  public get(email:string){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT l.email, l.password, l.perfil, l.foto, p.nome, p.dataAdmissao  FROM login l, professor p '
                + 'WHERE l.email = p.login_email and l.email = ?';
      let data = [email];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let professor = new Professor();
          professor.login.email = item.email;
          professor.login.perfil = <EnumLogin>item.perfil;
          professor.login.password = item.password;
          professor.login.foto = item.foto;
          professor.nome = item.nome;
          professor.dataAdmissao = new Date(item.dataAdmissao).toISOString();
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
      let sql = 'SELECT l.email, l.password, l.perfil, l.foto, p.nome, p.dataAdmissao  FROM login l, professor p '
                + 'WHERE l.email = p.login_email';
      return db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0){
          let professores: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            let professor = new Professor();
            let item = data.rows.item(i);
            professor.login.email = item.email;
            professor.login.perfil = <EnumLogin>item.perfil;
            professor.login.password = item.password;
            professor.login.foto = item.foto;
            professor.nome = item.nome;
            professor.dataAdmissao = new Date(item.dataAdmissao).toISOString();
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
  login: Login = new Login();
  nome:string;
  dataAdmissao:string;
}
