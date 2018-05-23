import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginProvider {

  public perfil: number = 0;

  constructor(private dbProvider: DatabaseProvider) {

  }

  public insert(login: Login){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'INSERT INTO login(email, password, perfil) VALUES(?,?,?)';
      let data = [login.email,login.password,login.perfil];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar insert login',e));
    })
    .catch((e) => console.error('Erro ao inserir login', e));
  }

  public update(login:Login){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'UPDATE login SET password = ?, perfil = ? WHERE email = ?';
      let data = [login.password,login.perfil, login.email];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update login',e));
    })
    .catch((e) => console.error('Erro ao atualizar login', e));
  }

  public get(email:string, password:string){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT email, password, perfil FROM login WHERE  email=? and password=?';
      let data = [email, password];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let login = new Login();
          login.email = item.email;
          login.password = item.password;
          login.perfil = item.perfil;

          return login;
        }
        return null;
      })
      .catch((e) => console.error('Erro ao executar get login', e));
    })
    .catch((e) => console.error('Erro ao pesquisar login', e));
  }
}

export class Login{
  email:string;
  password:string;
  perfil:string;
}
