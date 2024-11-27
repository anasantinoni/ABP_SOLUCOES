import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import { useDatabase } from "../database/useDatabase";

export default function PesquisaAluno({ navigation }) {
  const [alunos, setAlunos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { getAlunos } = useDatabase();

  const buscarAluno = async (nome) => {
    try {
      const alunosResult = await getAlunos(nome);
      setAlunos(alunosResult); 
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      buscarAluno(""); 
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Input
          label="Digite o nome do aluno"
          placeholder="Ex: João"
          value={searchTerm}
          onChangeText={(text) => {
            setSearchTerm(text);
            buscarAluno(text); 
          }}
        />
        <View style={styles.cardContainer}>
          {alunos.map((aluno) => (
            <Card
              key={aluno.id_aluno}
              title={`Nome: ${aluno.nome_aluno}`}
              description={`CPF: ${aluno.cpf_aluno}`}
              onPress={() =>
                navigation.navigate("DetalhesAluno", { alunoId: aluno.id_aluno })
              }
            />
          ))}
        </View>
      </ScrollView>
      <Button
        title="Adicionar Aluno"
        icon="add"
        onPress={() => navigation.navigate("CadastrarAluno")}
        style={styles.addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  scrollContainer: {
    padding: 20,
  },
  cardContainer: {
    marginTop: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: "90%",
  },
});
