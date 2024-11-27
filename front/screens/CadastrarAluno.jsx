import { View, Text } from "react-native";
import { useTheme, Button } from "react-native-paper";
import React, { useState } from "react";
import { TextInput } from "react-native-paper";

export default function CadastrarAluno({ navigation, route }) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [curso, setCurso] = useState("");

  const handleCadastro = () => {
    // Lógica para cadastrar aluno
    console.log("Aluno cadastrado:", { nome, idade, curso });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Cadastrar Aluno</Text>
      <TextInput
        label="Nome Completo"
        value={nome}
        onChangeText={setNome}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="Data"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="CPF"
        value={curso}
        onChangeText={setCurso}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="Renach"
        value={curso}
        onChangeText={setCurso}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="Categoria"
        value={curso}
        onChangeText={setCurso}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        label="Status do Aluno"
        value={curso}
        onChangeText={setCurso}
        style={{ marginBottom: 20 }}
      />
      <Button mode="contained" onPress={handleCadastro}>
        Cadastrar
      </Button>
    </View>
  );
}
