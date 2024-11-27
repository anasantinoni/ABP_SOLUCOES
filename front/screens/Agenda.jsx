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

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [aulaSelecionada, setAulaSelecionada] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const horarios = Array.from({ length: 12 }, (_, index) => ({
    id: index,
    horario: `${8 + index}:00`,
    aulas: [
      {
        id: `${index}-1`,
        aluno: `Aluno ${index + 1}`,
        tipo: index % 2 === 0 ? "Prática" : "Teórica",
        carro: `Carro ${index + 1}`,
        local: `Local ${index + 1}`,
      },
    ],
  }));

  const onDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
    }
  };

  const abrirModal = (aula = null) => {
    setAulaSelecionada(
      aula || {
        horario: "",
        aluno: "",
        carro: "",
        local: "",
        tipo: "",
      }
    );
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setAulaSelecionada(null);
  };

  const salvarAula = () => {
    console.log("Aula salva:", aulaSelecionada);
    fecharModal();
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setAulaSelecionada({
        ...aulaSelecionada,
        horario: selectedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
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

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <ScrollView style={styles.scrollContainer}>
        {horarios.map((horario) => (
          <View key={horario.id} style={styles.horarioContainer}>
            <Text style={styles.horarioText}>{horario.horario}</Text>
            {horario.aulas.map((aula) => (
              <Pressable
                key={aula.id}
                style={[
                  styles.aulaCard,
                  aula.tipo === "Prática" ? styles.praticaCard : styles.teoricaCard,
                ]}
                onPress={() => abrirModal(aula)}
              >
                <Text style={styles.aulaInfo}>{aula.aluno}</Text>
                <Text style={styles.aulaSubText}>Tipo: {aula.tipo}</Text>
              </Pressable>
            ))}
          </View>
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
                {aulaSelecionada.id ? "Editar Aula" : "Adicionar Aula"}
              </Text>
              <Pressable
                onPress={() => setShowTimePicker(true)}
                style={styles.timeInput}
              >
                <Text style={styles.timeText}>
                  {aulaSelecionada.horario || "Selecione o horário"}
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
                label="Aluno"
                value={aulaSelecionada.aluno}
                onChangeText={(text) =>
                  setAulaSelecionada({ ...aulaSelecionada, aluno: text })
                }
              />
              <Input
                label="Carro"
                value={aulaSelecionada.carro}
                onChangeText={(text) =>
                  setAulaSelecionada({ ...aulaSelecionada, carro: text })
                }
              />
              <Input
                label="Local"
                value={aulaSelecionada.local}
                onChangeText={(text) =>
                  setAulaSelecionada({ ...aulaSelecionada, local: text })
                }
              />
              <Input
                label="Tipo"
                value={aulaSelecionada.tipo}
                onChangeText={(text) =>
                  setAulaSelecionada({ ...aulaSelecionada, tipo: text })
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
  horarioContainer: {
    marginBottom: 10,
  },
  horarioText: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Montserrat",
    color: "#2C2F33",
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
