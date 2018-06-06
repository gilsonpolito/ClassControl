import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { EnumLogin } from '../../app/app.component';
import { Login } from '../login/login';

@Injectable()
export class AlunoProvider {

  constructor(private dbProvider: DatabaseProvider) {
  }

  public insert(aluno: Aluno){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      db.sqlBatch([
        ['INSERT INTO login(email, password, perfil, foto) VALUES(?,?,?,?)',[aluno.login.email, aluno.login.password, EnumLogin.ALUNO, aluno.login.foto]],
        ['INSERT INTO aluno(login_email, nome, dataNascimento) VALUES(?,?,?)',[aluno.login.email, aluno.nome, new Date(Date.parse(aluno.dataNascimento))]]
      ])
      .catch((e) => console.error('Erro ao executar insert aluno', e));
    })
    .catch((e) => console.error('Erro ao inserir aluno', e));
  }

  public update(aluno:Aluno){
    return this.dbProvider.getDB()
    .then((db:SQLiteObject) =>{
      db.sqlBatch([
        ['UPDATE login SET password = ?, foto = ? WHERE email = ?',[aluno.login.password, aluno.login.foto, aluno.login.email]],
        ['UPDATE aluno SET nome = ?, dataNascimento = ? WHERE login_email = ?', [aluno.nome, new Date(Date.parse(aluno.dataNascimento)), aluno.login.email]]
      ])
      .catch((e) => console.error('Erro ao executar update aluno',e));
    })
    .catch((e) => console.error('Erro ao atualizar aluno', e));
  }

  public get(email:string){
    return this.dbProvider.getDB()
    .then((db: SQLiteObject) => {
      let sql = 'SELECT l.email, l.password, l.perfil, l.foto, a.nome, a.dataNascimento FROM login l, aluno a '
                + 'WHERE l.email = a.login_email and l.email = ?';
      let data = [email];
      return db.executeSql(sql, data)
      .then((data: any) => {
        if (data.rows.length > 0){
          let item = data.rows.item(0);
          let aluno = new Aluno();
          aluno.login.email = item.email;
          aluno.login.foto = item.foto;
          aluno.login.password = item.password;
          aluno.login.perfil = <EnumLogin>item.perfil;
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
      let sql = 'SELECT l.email, l.password, l.perfil, l.foto, a.nome, a.dataNascimento FROM login l, aluno a '
                + 'WHERE l.email = a.login_email';
      return db.executeSql(sql, [])
      .then((data: any) => {
        if (data.rows.length > 0){
          let alunos: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            let item = data.rows.item(i);
            let aluno = new Aluno();
            aluno.login.email = item.email;
            aluno.login.foto = item.foto;
            aluno.login.password = item.password;
            aluno.login.perfil = <EnumLogin>item.perfil;
            aluno.nome = item.nome;
            aluno.dataNascimento = new Date(item.dataNascimento).toISOString();
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
  login: Login = new Login();
  nome:string;
  dataNascimento:string;
}
