import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { EnumLogin } from '../../app/app.component';

@Injectable()
export class LoginProvider {

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

  public get(log: Login){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT email, password, perfil FROM login WHERE  email=? and password=?';
      let data = [log.email, log.password];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let login = new Login();
          login.email = item.email;
          login.password = item.password;
          login.perfil = <EnumLogin>item.perfil;
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
  constructor(){}
  email:string;
  password:string;
  perfil:EnumLogin;
}
