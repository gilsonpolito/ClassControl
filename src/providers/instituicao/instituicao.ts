import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { EnumLogin } from '../../app/app.component';

@Injectable()
export class InstituicaoProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }
  public insert(instituicao: Instituicao){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'INSERT INTO instituicao(email, nome, foto) VALUES(?,?,?)';
      let data = [instituicao.email,instituicao.nome,instituicao.foto];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar insert instituicao',e));
    })
    .catch((e) => console.error('Erro ao inserir instituicao', e));
  }

  public update(instituicao:Instituicao){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'UPDATE instituicao SET nome = ?, foto = ? WHERE login_email = ?';
      let data = [instituicao.nome,instituicao.foto, instituicao.email];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update instituicao',e));
    })
    .catch((e) => console.error('Erro ao atualizar instituicao', e));
  }

  public get(email:string){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT login_email, nome, foto, perfil FROM instituicao i, login l WHERE i.login_email = l.email and l.email=?';
      let data = [email];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let instituicao = new Instituicao();
          instituicao.email = item.login_email;
          instituicao.nome = item.nome;
          instituicao.foto = item.foto;
          instituicao.perfil = <EnumLogin>item.perfil;

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
  email:string;
  nome:string;
  foto:string;
  perfil:EnumLogin;
}
