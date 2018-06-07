import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { EnumLogin } from '../../app/app.component';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
  }

  public getDB(){
    return this.sqlite.create({
      name: 'classcontrol.db',
      location: 'default'
    });
  }

  public createDatabase(){
    return this.getDB()
    .then((db: SQLiteObject) => {
      this.createTables(db);
    })
    .catch(e => console.log('Erro no getDB', e));
  }

  private createTables(db: SQLiteObject){
    console.log('createTables');
    db.sqlBatch([
      ['DROP TABLE IF EXISTS vinculo'],
      ['DROP TABLE IF EXISTS turma'],
      ['DROP TABLE IF EXISTS aluno'],
      ['DROP TABLE IF EXISTS professor'],
      ['DROP TABLE IF EXISTS disciplina'],
      ['DROP TABLE IF EXISTS instituicao'],
      ['DROP TABLE IF EXISTS login'],
      ['CREATE TABLE IF NOT EXISTS login(email TEXT PRIMARY KEY, password TEXT, foto TEXT, perfil INTEGER)'],
      ['CREATE TABLE IF NOT EXISTS instituicao(login_email TEXT PRIMARY KEY, nome TEXT, FOREIGN KEY(login_email) REFERENCES login(email))'],
      ['CREATE TABLE IF NOT EXISTS disciplina(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome TEXT NOT NULL, cargaHoraria INTEGER NOT NULL)'],
      ['CREATE TABLE IF NOT EXISTS professor(login_email TEXT PRIMARY KEY, nome TEXT NOT NULL, dataAdmissao DATE NOT NULL, FOREIGN KEY(login_email) REFERENCES login(email))'],
      ['CREATE TABLE IF NOT EXISTS aluno(login_email TEXT PRIMARY KEY, nome TEXT NOT NULL, dataNascimento DATE NOT NULL, FOREIGN KEY(login_email) REFERENCES login(email))'],
      ['CREATE TABLE IF NOT EXISTS turma(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, disciplina_id INTEGER NOT NULL, professor_login_email TEXT NOT NULL, FOREIGN KEY(disciplina_id) REFERENCES disciplina(id), FOREIGN KEY(professor_login_email)  REFERENCES professor(login_email))'],
      ['CREATE TABLE IF NOT EXISTS vinculo(turma_id INTEGER NOT NULL, aluno_login_email TEXT NOT NULL, PRIMARY KEY(turma_id, aluno_login_email))']
    ])
    .then(() => {console.log('Tabelas criadas'); this.insertDefault(db);})
    .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefault(db: SQLiteObject){
    db.executeSql('SELECT COUNT(email) as qtd FROM login',{})
    .then((data: any) =>{
      if(data.rows.item(0).qtd == 0){
        db.sqlBatch([
          ['INSERT INTO login(email, password, perfil, foto) VALUES(?,?,?,?)', ['ifsp','ifsp',EnumLogin.INSTITUICAO, null]]
          ,['INSERT INTO instituicao(nome, login_email) VALUES(?,?)', ['Instituição teste com bd', 'ifsp']]

          ,['INSERT INTO login(email, password, perfil, foto) VALUES(?,?,?,?)', ['prof','prof',EnumLogin.PROFESSOR, null]]
          ,['INSERT INTO professor(login_email, nome, dataAdmissao) VALUES(?,?,?)',['prof','Gilson', new Date()]]
          ,['INSERT INTO login(email, password, perfil, foto) VALUES(?,?,?,?)', ['alu','alu',EnumLogin.ALUNO, null]]
          ,['INSERT INTO aluno(login_email,nome, dataNascimento) VALUES(?,?,?)',['alu','Aluno teste', new Date()]]
          ,['INSERT INTO disciplina(nome, cargaHoraria) VALUES(?,?)', ['Matemática',20]]
          ,['INSERT INTO disciplina(nome, cargaHoraria) VALUES(?,?)', ['Portugues',10]]
          ,['INSERT INTO turma(disciplina_id, professor_login_email) VALUES(?,?)', [1,'prof']]
          ,['INSERT INTO vinculo(turma_id, aluno_login_email) VALUES(?,?)',[1,'alu']]
        ])
        .catch(e => console.error('Erro ao incluir Instituicao padrão', e));
      } else{
        console.log('A base já possui informações!!!');
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de logins', e));
  }
}
