import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import React from "react";

export default function PesquisaAluno({ navigation }) {
  const theme = useTheme();

  //array para simular um banco de dados
  const alunosData = [
    { id: 1, nome: "João", idade: 20, cpf: "123.456.789-00" },
    { id: 2, nome: "Maria", idade: 22, cpf: "123.456.789-00" },
    { id: 3, nome: "José", idade: 21, cpf: "123.456.789-00" },
    { id: 4, nome: "Ana", idade: 24, cpf: "123.456.789-00" },
    { id: 5, nome: "Pedro", idade: 23, cpf: "123.456.789-00" },
    { id: 6, nome: "Marta", idade: 19, cpf: "123.456.789-00" },
    { id: 7, nome: "Carlos", idade: 25, cpf: "123.456.789-00" },
    { id: 8, nome: "Paula", idade: 26, cpf: "123.456.789-00" },
    { id: 9, nome: "Lucas", idade: 27, cpf: "123.456.789-00" },
    { id: 10, nome: "Julia", idade: 28, cpf: "123.456.789-00" },
  ];
  const [aluno, setAluno] = React.useState(alunosData);

  const buscarAluno = (nome) => {
    const alunoResult = alunosData.filter((aluno) => (aluno.nome === nome) || (aluno.idade == nome));
    if (alunoResult.length > 0) {
      setAluno(alunoResult);
    } else {
      setAluno(alunosData);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          alignItems: "center",
        },
      ]}
    >
      <TextInput
        label="Digite o nome do aluno"
        style={{ width: "100%" }}
        onChangeText={(text) => buscarAluno(text)}
      />
      {aluno ? (
        aluno.map((aluno) => (
          <Pressable
            onPress={() => {
              navigation.navigate("DetalhesAluno", { aluno });
            }}
            key={aluno.id}
            style={{
              padding: 10,
              margin: 10,
              backgroundColor: "#f0f0f0",
              width: "100%",
            }}
          >
            <Text style={
              {
                fontWeight: 'bold',
                color: theme.colors.secondary
              }
            }>Renasch: {aluno.id}</Text>
            <Text style={
              {
                fontWeight: 'bold',
                color: theme.colors.secondary
              }
            }>Nome: {aluno.nome}</Text>
            <Text style={
              {
                fontWeight: 'bold',
                color: theme.colors.secondary
              }
            }>Idade: {aluno.idade}</Text>
          </Pressable>
        ))
      ) : (
        <Text>Aluno não encontrado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});
