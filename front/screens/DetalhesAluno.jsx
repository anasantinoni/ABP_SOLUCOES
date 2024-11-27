import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDatabase } from "../database/useDatabase";

export default function DetalhesAluno({ navigation, route }) {
  const { alunoId } = route.params; // Recebe o ID do aluno
  const { getFinanceiros, addFinanceiro, updateFinanceiro, deleteFinanceiro } =
    useDatabase();

  const [aluno, setAluno] = useState(null);
  const [parcelas, setParcelas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [parcelaSelecionada, setParcelaSelecionada] = useState(null);

  const carregarParcelas = async () => {
    try {
      const response = await getFinanceiros(alunoId); 
      setParcelas(response);
    } catch (error) {
      console.error("Erro ao carregar parcelas: ", error);
    }
  };

 
  const abrirModal = (parcela = null) => {
    setParcelaSelecionada(
      parcela || { valor: "", data_vencimento: "", id_aluno: alunoId }
    );
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setParcelaSelecionada(null);
  };

 
  const salvarParcela = async () => {
    try {
      if (parcelaSelecionada.id_parcela) {
        
        await updateFinanceiro(parcelaSelecionada);
      } else {
        
        await addFinanceiro(parcelaSelecionada);
      }
      carregarParcelas();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar parcela: ", error);
    }
  };

  const removerParcela = async (id_parcela) => {
    try {
      await deleteFinanceiro(id_parcela);
      carregarParcelas(); 
    } catch (error) {
      console.error("Erro ao remover parcela: ", error);
    }
  };

  useEffect(() => {
    carregarParcelas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Aluno</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Input
          label="ID"
          value={String(alunoId)}
          editable={false}
          style={styles.input}
        />
        <Input
          label="Nome"
          value={aluno?.nome_aluno || ""}
          editable={false}
          style={styles.input}
        />
        <Input
          label="CPF"
          value={aluno?.cpf_aluno || ""}
          editable={false}
          style={styles.input}
        />

        <Text style={styles.subTitle}>Parcelas</Text>
        {parcelas.map((parcela) => (
          <Pressable
            key={parcela.id_parcela}
            style={styles.parcelaCard}
            onPress={() => abrirModal(parcela)}
          >
            <Text style={styles.parcelaText}>
              Vencimento: {parcela.data_vencimento} - Valor: R$ {parcela.valor}
            </Text>
            <Button
              title="Excluir"
              icon="delete"
              onPress={() => removerParcela(parcela.id_parcela)}
              style={styles.deleteButton}
            />
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.footerContainer}>
        <Button
          title="Adicionar Parcela"
          icon="add"
          onPress={() => abrirModal()}
          style={styles.addButton}
        />
        <View style={styles.actionButtonContainer}>
          <Button
            title="Editar Aluno"
            icon="edit"
            onPress={() => navigation.navigate("CadastrarAluno", { aluno })}
            style={[styles.actionButton, styles.editButton]}
          />
        </View>
      </View>

      {parcelaSelecionada && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={fecharModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {parcelaSelecionada.id_parcela
                  ? "Editar Parcela"
                  : "Adicionar Parcela"}
              </Text>
              <Input
                label="Valor"
                value={String(parcelaSelecionada.valor)}
                onChangeText={(text) =>
                  setParcelaSelecionada({
                    ...parcelaSelecionada,
                    valor: parseFloat(text),
                  })
                }
                style={styles.modalInput}
              />
              <Input
                label="Vencimento"
                value={parcelaSelecionada.data_vencimento}
                onChangeText={(text) =>
                  setParcelaSelecionada({
                    ...parcelaSelecionada,
                    data_vencimento: text,
                  })
                }
                style={styles.modalInput}
              />
              <View style={styles.modalButtonContainer}>
                <Button
                  title="Salvar"
                  onPress={salvarParcela}
                  style={styles.saveButton}
                />
                <Button
                  title="Fechar"
                  onPress={fecharModal}
                  style={styles.closeButton}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 150,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat",
    color: "#0056B3",
    textAlign: "center",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: "Montserrat",
    color: "#2C2F33",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    marginBottom: 15,
  },
  parcelaCard: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#A8C8E0",
  },
  parcelaText: {
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  footerContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  addButton: {
    width: "90%",
    marginBottom: 10,
    backgroundColor: "#4CAF50",
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  actionButton: {
    width: "48%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#0056B3",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Montserrat",
    color: "#0056B3",
    marginBottom: 15,
  },
  modalInput: {
    marginBottom: 15,
    width: "100%",
  },
  modalButtonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    width: "80%",
    marginVertical: 5,
  },
  closeButton: {
    backgroundColor: "#0056B3",
    width: "80%",
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    marginTop: 10,
  },
});
