import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class AlunoProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }
  public insert(aluno: Aluno){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'INSERT INTO aluno(login_email, nome, dataNascimento) VALUES(?,?,?)';
      let data = [aluno.email, aluno.nome, aluno.dataNascimento];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar insert aluno',e));
    })
    .catch((e) => console.error('Erro ao inserir aluno', e));
  }

  public update(aluno:Aluno){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'UPDATE aluno SET nome = ?, dataNascimento = ? WHERE login_email = ?';
      let data = [aluno.nome,aluno.dataNascimento, aluno.email];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update aluno',e));
    })
    .catch((e) => console.error('Erro ao atualizar aluno', e));
  }

  public get(email:string){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT login_email, nome, dataNascimento FROM aluno WHERE  login_email=?';
      let data = [email];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let aluno = new Aluno();
          aluno.email = item.login_email;
          aluno.nome = item.nome;
          aluno.dataNascimento = item.dataNascimento;

          return aluno;
        }
        return null;
      })
      .catch((e) => console.error('Erro ao executar get aluno', e));
    })
    .catch((e) => console.error('Erro ao pesquisar aluno', e));
  }
  }

  export class Aluno{
  email:string;
  nome:string;
  dataNascimento:number;
  foto:string;
  }
