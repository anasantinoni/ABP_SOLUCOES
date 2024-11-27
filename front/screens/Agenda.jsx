import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDatabase } from "../database/useDatabase";

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [aulaSelecionada, setAulaSelecionada] = useState(null);
  const [aulas, setAulas] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const { getAulas, addAula, updateAula } = useDatabase();

  useEffect(() => {
    carregarAulas();
  }, [selectedDate]);

  const carregarAulas = async () => {
    try {
      const response = await getAulas(selectedDate.toISOString().split("T")[0]);
      setAulas(response);
    } catch (error) {
      console.error("Erro ao carregar aulas:", error);
    }
  };

  const abrirModal = (aula = null) => {
    setAulaSelecionada(
      aula || {
        id_aula: null,
        id_aluno: "",
        id_usuario: "",
        data_aula: selectedDate.toISOString().split("T")[0],
        hora_aula: "",
        tipo_aula: "1", 
        status_aula: "1", 
        motivo_cancelamento: "",
        placa_carro: "",
      }
    );
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setAulaSelecionada(null);
  };

  const salvarAula = async () => {
    try {
      if (aulaSelecionada.id_aula) {
        await updateAula(aulaSelecionada);
      } else {
        await addAula(aulaSelecionada);
      }
      carregarAulas();
      fecharModal();
    } catch (error) {
      console.error("Erro ao salvar aula:", error);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setAulaSelecionada({
        ...aulaSelecionada,
        hora_aula: selectedTime.toTimeString().split(" ")[0],
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda</Text>
      <Pressable onPress={() => setShowDatePicker(true)} style={styles.dateInput}>
        <Text style={styles.dateText}>
          {selectedDate.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
      </Pressable>

      <ScrollView style={styles.scrollContainer}>
        {aulas.map((aula) => (
          <Pressable
            key={aula.id_aula}
            style={[
              styles.aulaCard,
              aula.tipo_aula === 1 ? styles.praticaCard : styles.teoricaCard,
            ]}
            onPress={() => abrirModal(aula)}
          >
            <Text style={styles.aulaInfo}>
              {aula.hora_aula} - Aluno: {aula.id_aluno || "N/A"}
            </Text>
            <Text style={styles.aulaSubText}>
              Tipo: {aula.tipo_aula === 1 ? "Prática" : "Teórica"}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {aulaSelecionada && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={fecharModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {aulaSelecionada.id_aula ? "Editar Aula" : "Adicionar Aula"}
              </Text>
              <Pressable
                onPress={() => setShowTimePicker(true)}
                style={styles.timeInput}
              >
                <Text style={styles.timeText}>
                  {aulaSelecionada.hora_aula || "Selecione o horário"}
                </Text>
              </Pressable>
              {showTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="default"
                  onChange={onTimeChange}
                />
              )}
              <Input
                label="ID Aluno"
                value={aulaSelecionada.id_aluno}
                onChangeText={(text) =>
                  setAulaSelecionada({ ...aulaSelecionada, id_aluno: text })
                }
              />
              <Input
                label="Placa do Carro"
                value={aulaSelecionada.placa_carro}
                onChangeText={(text) =>
                  setAulaSelecionada({ ...aulaSelecionada, placa_carro: text })
                }
              />
              <Input
                label="Tipo"
                value={aulaSelecionada.tipo_aula.toString()}
                onChangeText={(text) =>
                  setAulaSelecionada({ ...aulaSelecionada, tipo_aula: text })
                }
              />

              <View style={styles.modalButtonContainer}>
                <Button
                  title="Salvar"
                  onPress={salvarAula}
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

      <Button
        title="Adicionar Aula"
        icon="add"
        onPress={() => abrirModal()}
        style={styles.addButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#0056B3",
    marginBottom: 10,
    fontFamily: "Montserrat",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  scrollContainer: {
    flex: 1,
  },
  aulaCard: {
    padding: 10,
    borderRadius: 4,
    marginTop: 5,
    borderLeftWidth: 5,
  },
  praticaCard: {
    backgroundColor: "#E8F5E9",
    borderLeftColor: "#4CAF50",
  },
  teoricaCard: {
    backgroundColor: "#FFEBEE",
    borderLeftColor: "#F44336",
  },
  aulaInfo: {
    fontSize: 14,
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  aulaSubText: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "#555",
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
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Montserrat",
    color: "#0056B3",
    marginBottom: 15,
    textAlign: "center",
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  timeText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    width: "45%",
  },
  closeButton: {
    backgroundColor: "#D32F2F",
    width: "45%",
  },
  addButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    alignSelf: "center",
    width: "90%",
  },
});
