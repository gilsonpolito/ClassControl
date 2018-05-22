import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the InstituicaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
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
      let sql = 'UPDATE instituicao SET nome = ?, foto = ? WHERE email = ?';
      let data = [instituicao.nome,instituicao.foto, instituicao.email];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update instituicao',e));
    })
    .catch((e) => console.error('Erro ao atualizar instituicao', e));
  }

  public get(email:string, password:string){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT email, nome, foto FROM instituicao WHERE  email=?';
      let data = [email];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let instituicao = new Instituicao();
          instituicao.email = item.email;
          instituicao.nome = item.nome;
          instituicao.foto = item.foto;

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
  }