import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { EnumLogin } from '../../app/app.component';
import { Login } from '../login/login';

@Injectable()
export class InstituicaoProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }
  public insert(instituicao: Instituicao){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      db.sqlBatch([
        ['INSERT INTO login(email, password, perfil, foto) VALUES(?,?,?,?)',[instituicao.login.email, instituicao.login.password, EnumLogin.INSTITUICAO, instituicao.login.foto]],
        ['INSERT INTO instituicao(email, nome, foto) VALUES(?,?,?)',[instituicao.login.email,instituicao.nome]]
      ])
      .catch((e) => console.error('Erro ao executar insert instituicao',e));
    })
    .catch((e) => console.error('Erro ao inserir instituicao', e));
  }

  public update(instituicao:Instituicao){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      db.sqlBatch([
        ['UPDATE login SET password = ?, foto = ? WHERE email = ?',[instituicao.login.password, instituicao.login.foto, instituicao.login.email]],
        ['UPDATE instituicao SET nome = ?, WHERE login_email = ?',[instituicao.nome,instituicao.login.email]]
      ])
      .catch((e) => console.error('Erro ao executar update instituicao',e));
    })
    .catch((e) => console.error('Erro ao atualizar instituicao', e));
  }

  public get(email:string){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT l.email, l.password, l.perfil, l.foto, i.nome FROM login l, instituicao i '
                + 'WHERE l.email = i.login_email and l.email = ?';
      let data = [email];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let instituicao = new Instituicao();

          instituicao.login.email = item.email;
          instituicao.login.foto = item.foto;
          instituicao.login.password = item.password;
          instituicao.login.perfil = <EnumLogin>item.perfil;
          instituicao.nome = item.nome;

          return instituicao;
        }
        return null;
      })
      .catch((e) => console.error('Erro ao executar get instituicao', e));
    })
    .catch((e) => console.error('Erro ao pesquisar instituicao', e));
  }
}

export class Instituicao{
  login:Login = new Login();
  nome:string;
}
