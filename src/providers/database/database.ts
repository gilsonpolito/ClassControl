import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
  }

  public getDB(){
    console.log('getDB');
    return this.sqlite.create({
      name: 'classcontrol.db',
      location: 'default'
    });
  }

  public createDatabase(){
    console.log('createDatabase');
    return this.getDB()
    .then((db: SQLiteObject) => {
      console.log('apos recuperar banco');
      this.createTables(db);
      this.insertDafault(db);
    })
    .catch(e => console.log('Erro no getDB', e));
  }

  private createTables(db: SQLiteObject){
    console.log('createTables');
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS login(email TEXT PRIMARY KEY, password TEXT, perfil TEXT)'],
      ['CREATE TABLE IF NOT EXISTS instituicao(login_email TEXT PRIMARY KEY, nome TEXT, foto TEXT, FOREIGN KEY(login_email) REFERENCES login(email))']
    ])
    .then(() => console.log('Tabelas criadas'))
    .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDafault(db: SQLiteObject){
    console.log('insertDafault');
    db.executeSql('SELECT COUNT(email) as qtd FROM login',{})
    .then((data: any) =>{
      console.log('apos select');
      if(data.rows.item(0).qtd == 0){
        db.sqlBatch([
          ['INSERT INTO login(email, password, perfil) VALUES(?,?,?)', ['admin@admin.com','admin','I']],
          ['INSERT INTO instituicao(id, nome, login_email) VALUES(?,?,?,?)', [1,'Instituição teste', 'admin@admin.com']]
        ])
        .then(() => console.log('Administrador e instituicao incluído com sucesso'))
        .catch(e => console.error('Erro ao incluir Administrador e instituicao', e));
      } else{
        console.log('entrou no else');
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de logins', e));
  }
}
