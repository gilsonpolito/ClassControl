import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { EnumLogin } from '../../app/app.component';

@Injectable()
export class AlunoProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }

  public insert(aluno: Aluno){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      db.sqlBatch([
        ['INSERT INTO login(email, password, perfil) VALUES(?,?,?)',[aluno.email, aluno.senha, EnumLogin.ALUNO]],
        ['INSERT INTO aluno(login_email, nome, dataNascimento, foto) VALUES(?,?,?,?)',[aluno.email, aluno.nome, new Date(Date.parse(aluno.dataNascimento)), aluno.foto]]
      ])
      .catch((e) => console.error('Erro ao inserir aluno', e));
    });
  }

  public update(aluno:Aluno){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      let sql = 'UPDATE aluno SET nome = ?, dataNascimento = ?, foto = ? WHERE login_email = ?';
      let data = [aluno.nome,new Date(Date.parse(aluno.dataNascimento)), aluno.foto, aluno.email];
      return db.executeSql(sql,data)
      .catch((e) => console.error('Erro ao executar update aluno',e));
    })
    .catch((e) => console.error('Erro ao atualizar aluno', e));
  }

  public get(email:string){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT login_email, nome, dataNascimento, foto FROM aluno WHERE  login_email=?';
      let data = [email];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let aluno = new Aluno();
          aluno.email = item.login_email;
          aluno.nome = item.nome;
          aluno.dataNascimento = new Date(item.dataNascimento).toISOString();

          return aluno;
        }
        return null;
      })
      .catch((e) => console.error('Erro ao executar get aluno', e));
    })
    .catch((e) => console.error('Erro ao pesquisar aluno', e));
  }

  public getAll(){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT login_email, nome, dataNascimento, foto FROM aluno';
      return db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0){
          let alunos: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            let aluno = new Aluno();
            aluno.nome = data.rows.item(i).nome;
            aluno.email = data.rows.item(i).login_email;
            aluno.dataNascimento = new Date(data.rows.item(i).dataNascimento).toISOString();
            aluno.foto = data.rows.item(i).foto;
            alunos.push(aluno);
          }
          return alunos;
        } else {
          return [];
        }
      })
      .catch((e) => console.error('Erro ao executar getAll aluno', e));
    })
    .catch((e) => console.error('Erro ao pesquisar alunos', e));
  }
}

export class Aluno{
  email:string;
  senha:string;
  nome:string;
  dataNascimento:string;
  foto:string;
}
