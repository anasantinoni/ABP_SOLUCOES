import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  // aluno
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Aluno (
      id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_aluno TEXT NOT NULL,
      email_aluno TEXT NOT NULL,
      data_nascimento DATE NOT NULL,
      cpf_aluno TEXT NOT NULL,
      renach_aluno TEXT,
      celular_aluno TEXT,
      rua_aluno TEXT,
      numero_residencial_aluno TEXT,
      bairro_aluno TEXT,
      cidade_aluno TEXT,
      estado_aluno TEXT,
      data_criacao_aluno DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_atualizacao_aluno DATETIME DEFAULT CURRENT_TIMESTAMP,
      usuario_alteracao_aluno INTEGER
    );
  `);

  // usuario
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Usuario (
      id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_usu TEXT NOT NULL,
      email_usu TEXT NOT NULL,
      senha_usu TEXT NOT NULL,
      celular_usu TEXT,
      cargo_usu INTEGER CHECK (cargo_usu IN (1, 2, 3)),
      data_criacao_usu DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_atualizacao_usu DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // financeiro
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Financeiro (
      id_parcela INTEGER PRIMARY KEY AUTOINCREMENT,
      id_aluno INTEGER NOT NULL,
      valor REAL NOT NULL,
      data_vencimento DATETIME NOT NULL,
      data_pagamento DATETIME,
      status INTEGER CHECK (status IN (1, 2, 3)),
      valor_multa REAL,
      valor_desconto REAL,
      data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
      tipo_pagamento INTEGER CHECK (tipo_pagamento IN (1, 2, 3, 4, 5)),
      tipo_parcela INTEGER CHECK (tipo_parcela IN (1, 2)),
      FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno)
    );
  `);

  // aulas
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Aulas (
      id_aula INTEGER PRIMARY KEY AUTOINCREMENT,
      id_aluno INTEGER NOT NULL,
      id_usuario INTEGER NOT NULL,
      data_aula DATETIME NOT NULL,
      hora_aula TIME NOT NULL,
      tipo_aula INTEGER CHECK (tipo_aula IN (1, 2)),
      status_aula INTEGER CHECK (status_aula IN (1, 2)),
      motivo_cancelamento TEXT,
      placa_carro TEXT,
      data_criacao_aula DATETIME DEFAULT CURRENT_TIMESTAMP,
      data_atualizacao_aula DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (id_aluno) REFERENCES Aluno(id_aluno),
      FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
    );
  `);


  console.log("Database initialized and tables created.");
}


