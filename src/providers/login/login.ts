import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { EnumLogin } from '../../app/app.component';

@Injectable()
export class LoginProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }

  public get(log: Login){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT email, perfil FROM login WHERE  email=? and password=?';
      let data = [log.email, log.password];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let login = new Login();
          let result = data.rows.item(0);
          login.email = result.email;
          login.perfil = <EnumLogin>result.perfil;
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
  perfil:EnumLogin;
  foto:string;
}
