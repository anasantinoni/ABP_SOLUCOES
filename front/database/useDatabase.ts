import { useSQLiteContext } from "expo-sqlite";


export type Aluno = {
  id_aluno: number;
  nome_aluno: string;
  email_aluno: string;
  data_nascimento: string;
  cpf_aluno: string;
  renach_aluno?: string;
  celular_aluno?: string;
  rua_aluno?: string;
  numero_residencial_aluno?: string;
  bairro_aluno?: string;
  cidade_aluno?: string;
  estado_aluno?: string;
};

export type Financeiro = {
  id_parcela: number;
  id_aluno: number;
  valor: number;
  data_vencimento: string;
  data_pagamento?: string;
  status: number;
  valor_multa?: number;
  valor_desconto?: number;
  tipo_pagamento?: number;
  tipo_parcela?: number;
};

export type Aula = {
  id_aula: number;
  id_aluno: number;
  id_usuario: number;
  data_aula: string;
  hora_aula: string;
  tipo_aula: number;
  status_aula: number;
  motivo_cancelamento?: string;
  placa_carro?: string;
};

export function useDatabase() {
  const database = useSQLiteContext();

  // ===================== ALUNO CRUD =====================
  async function addAluno(data: Omit<Aluno, "id_aluno">) {
    const statement = await database.prepareAsync(`
      INSERT INTO Aluno (
        nome_aluno, email_aluno, data_nascimento, cpf_aluno, renach_aluno, 
        celular_aluno, rua_aluno, numero_residencial_aluno, bairro_aluno, 
        cidade_aluno, estado_aluno
      ) VALUES (
        $nome_aluno, $email_aluno, $data_nascimento, $cpf_aluno, $renach_aluno,
        $celular_aluno, $rua_aluno, $numero_residencial_aluno, $bairro_aluno, 
        $cidade_aluno, $estado_aluno
      )
    `);

    try {
      const result = await statement.executeAsync({
        $nome_aluno: data.nome_aluno,
        $email_aluno: data.email_aluno,
        $data_nascimento: data.data_nascimento,
        $cpf_aluno: data.cpf_aluno,
        $renach_aluno: data.renach_aluno,
        $celular_aluno: data.celular_aluno,
        $rua_aluno: data.rua_aluno,
        $numero_residencial_aluno: data.numero_residencial_aluno,
        $bairro_aluno: data.bairro_aluno,
        $cidade_aluno: data.cidade_aluno,
        $estado_aluno: data.estado_aluno,
      });

      return { insertedRowId: result.lastInsertRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getAlunos(filter?: string) {
    const query = filter
      ? `SELECT * FROM Aluno WHERE nome_aluno LIKE ?`
      : `SELECT * FROM Aluno`;
  
    try {
      const response = await database.getAllAsync<Aluno>(
        query,
        filter ? [`%${filter}%`] : []
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  

  async function updateAluno(data: Aluno) {
    const statement = await database.prepareAsync(`
      UPDATE Aluno SET 
        nome_aluno = $nome_aluno, email_aluno = $email_aluno, 
        data_nascimento = $data_nascimento, cpf_aluno = $cpf_aluno,
        renach_aluno = $renach_aluno, celular_aluno = $celular_aluno, 
        rua_aluno = $rua_aluno, numero_residencial_aluno = $numero_residencial_aluno, 
        bairro_aluno = $bairro_aluno, cidade_aluno = $cidade_aluno, 
        estado_aluno = $estado_aluno
      WHERE id_aluno = $id_aluno
    `);

    try {
      await statement.executeAsync({
        $id_aluno: data.id_aluno,
        $nome_aluno: data.nome_aluno,
        $email_aluno: data.email_aluno,
        $data_nascimento: data.data_nascimento,
        $cpf_aluno: data.cpf_aluno,
        $renach_aluno: data.renach_aluno,
        $celular_aluno: data.celular_aluno,
        $rua_aluno: data.rua_aluno,
        $numero_residencial_aluno: data.numero_residencial_aluno,
        $bairro_aluno: data.bairro_aluno,
        $cidade_aluno: data.cidade_aluno,
        $estado_aluno: data.estado_aluno,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function deleteAluno(id_aluno: number) {
    const statement = await database.prepareAsync(`DELETE FROM Aluno WHERE id_aluno = $id_aluno`);

    try {
      await statement.executeAsync({ $id_aluno: id_aluno });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  // ===================== FINANCEIRO CRUD =====================
  async function addFinanceiro(data: Omit<Financeiro, "id_parcela">) {
    const statement = await database.prepareAsync(`
      INSERT INTO Financeiro (
        id_aluno, valor, data_vencimento, status, valor_multa, 
        valor_desconto, tipo_pagamento, tipo_parcela
      ) VALUES (
        $id_aluno, $valor, $data_vencimento, $status, $valor_multa, 
        $valor_desconto, $tipo_pagamento, $tipo_parcela
      )
    `);

    try {
      const result = await statement.executeAsync({
        $id_aluno: data.id_aluno,
        $valor: data.valor,
        $data_vencimento: data.data_vencimento,
        $status: data.status,
        $valor_multa: data.valor_multa,
        $valor_desconto: data.valor_desconto,
        $tipo_pagamento: data.tipo_pagamento,
        $tipo_parcela: data.tipo_parcela,
      });

      return { insertedRowId: result.lastInsertRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getFinanceiros(filter?: string) {
    const query = filter
      ? `SELECT * FROM Financeiro WHERE id_aluno = ?`
      : `SELECT * FROM Financeiro`;

    try {
      const response = await database.getAllAsync<Financeiro>(
        query,
        filter ? [filter] : []
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function deleteFinanceiro(id_parcela: number) {
    const statement = await database.prepareAsync(`DELETE FROM Financeiro WHERE id_parcela = $id_parcela`);

    try {
      await statement.executeAsync({ $id_parcela: id_parcela });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  // ===================== AULAS CRUD =====================
  async function addAula(data: Omit<Aula, "id_aula">) {
    const statement = await database.prepareAsync(`
      INSERT INTO Aulas (
        id_aluno, id_usuario, data_aula, hora_aula, tipo_aula, status_aula, 
        motivo_cancelamento, placa_carro
      ) VALUES (
        $id_aluno, $id_usuario, $data_aula, $hora_aula, $tipo_aula, $status_aula, 
        $motivo_cancelamento, $placa_carro
      )
    `);

    try {
      const result = await statement.executeAsync({
        $id_aluno: data.id_aluno,
        $id_usuario: data.id_usuario,
        $data_aula: data.data_aula,
        $hora_aula: data.hora_aula,
        $tipo_aula: data.tipo_aula,
        $status_aula: data.status_aula,
        $motivo_cancelamento: data.motivo_cancelamento,
        $placa_carro: data.placa_carro,
      });

      return { insertedRowId: result.lastInsertRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getAulas(filter?: string) {
    const query = filter
      ? `SELECT * FROM Aulas WHERE id_aluno = ?`
      : `SELECT * FROM Aulas`;

    try {
      const response = await database.getAllAsync<Aula>(
        query,
        filter ? [filter] : []
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function deleteAula(id_aula: number) {
    const statement = await database.prepareAsync(`DELETE FROM Aulas WHERE id_aula = $id_aula`);

    try {
      await statement.executeAsync({ $id_aula: id_aula });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  return {
    // Aluno
    addAluno,
    getAlunos,
    updateAluno,
    deleteAluno,

    // Financeiro
    addFinanceiro,
    getFinanceiros,
    deleteFinanceiro,

    // Aulas
    addAula,
    getAulas,
    deleteAula,
  };
}
