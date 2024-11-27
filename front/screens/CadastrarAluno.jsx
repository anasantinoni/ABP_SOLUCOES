import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDatabase } from "../database/useDatabase";

export default function CadastrarAluno({ navigation }) {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [renach, setRenach] = useState("");
  const [categoria, setCategoria] = useState("");
  const [celular, setCelular] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const { addAluno } = useDatabase();

  const handleCadastro = async () => {
    try {
      await addAluno({
        nome_aluno: nome,
        email_aluno: `${cpf}@email.com`,
        data_nascimento: dataNascimento,
        cpf_aluno: cpf,
        renach_aluno: renach,
        celular_aluno: celular,
        rua_aluno: rua,
        numero_residencial_aluno: numero,
        bairro_aluno: bairro,
        cidade_aluno: cidade,
        estado_aluno: estado,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Aluno</Text>
      <View style={styles.formContainer}>
        <Input
          label="Nome Completo"
          placeholder="Digite o nome completo"
          value={nome}
          onChangeText={setNome}
        />
        <Input
          label="Data de Nascimento"
          placeholder="Ex: 01/01/2000"
          value={dataNascimento}
          onChangeText={setDataNascimento}
        />
        <Input
          label="CPF"
          placeholder="Digite o CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <Input
          label="Renach"
          placeholder="Digite o Renach"
          value={renach}
          onChangeText={setRenach}
        />
        <Input
          label="Categoria"
          placeholder="Ex: A, B, AB"
          value={categoria}
          onChangeText={setCategoria}
        />
        <Input
          label="Celular"
          placeholder="Digite o celular"
          value={celular}
          onChangeText={setCelular}
        />
        <Input
          label="Rua"
          placeholder="Digite a rua"
          value={rua}
          onChangeText={setRua}
        />
        <Input
          label="Número"
          placeholder="Digite o número"
          value={numero}
          onChangeText={setNumero}
        />
        <Input
          label="Bairro"
          placeholder="Digite o bairro"
          value={bairro}
          onChangeText={setBairro}
        />
        <Input
          label="Cidade"
          placeholder="Digite a cidade"
          value={cidade}
          onChangeText={setCidade}
        />
        <Input
          label="Estado"
          placeholder="Digite o estado"
          value={estado}
          onChangeText={setEstado}
        />
        <Button
          title="Cadastrar"
          onPress={handleCadastro}
          style={styles.submitButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat",
    color: "#0056B3",
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
    width: "100%",
    alignSelf: "center",
  },
});
