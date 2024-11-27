import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDatabase } from "../database/useDatabase";

export default function FinanceiroAluno() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [financeiros, setFinanceiros] = useState([]);

  const { getFinanceiros } = useDatabase();

  useEffect(() => {
    carregarDadosFinanceiros();
  }, [startDate, endDate]);

  const carregarDadosFinanceiros = async () => {
    try {
      const start = startDate.toISOString().split("T")[0];
      const end = endDate.toISOString().split("T")[0];
      const response = await getFinanceiros({ startDate: start, endDate: end });
      setFinanceiros(response);
    } catch (error) {
      console.error("Erro ao carregar dados financeiros:", error);
    }
  };

  const calcularTotais = () => {
    let totalReceber = 0;
    let totalPagar = 0;

    financeiros.forEach((item) => {
      if (item.status === 1) totalReceber += item.valor; // Status 1: A Receber
      if (item.status === 2) totalPagar += item.valor; // Status 2: A Pagar
    });

    return { totalReceber, totalPagar };
  };

  const { totalReceber, totalPagar } = calcularTotais();

  const dataGrafico = [
    {
      name: "A Receber",
      amount: totalReceber,
      color: "#4CAF50",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "A Pagar",
      amount: totalPagar,
      color: "#F44336",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financeiro</Text>

      <View style={styles.datePickerContainer}>
        <Pressable
          onPress={() => setShowStartPicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {startDate.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
        </Pressable>
        <Text style={styles.dateSeparator}>até</Text>
        <Pressable
          onPress={() => setShowEndPicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {endDate.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </Text>
        </Pressable>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selected) => {
            setShowStartPicker(false);
            if (selected) setStartDate(selected);
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selected) => {
            setShowEndPicker(false);
            if (selected) setEndDate(selected);
          }}
        />
      )}

      <ScrollView>
        <View style={styles.chartContainer}>
          <PieChart
            data={dataGrafico}
            width={300}
            height={220}
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={"amount"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
        </View>

        <View style={styles.totalContainer}>
          <View style={styles.totalCard}>
            <Text style={styles.totalTitle}>Total a Receber</Text>
            <Text style={styles.totalValue}>R$ {totalReceber.toFixed(2)}</Text>
          </View>
          <View style={styles.totalCard}>
            <Text style={styles.totalTitle}>Total a Pagar</Text>
            <Text style={styles.totalValue}>R$ {totalPagar.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>
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
    marginBottom: 20,
    fontFamily: "Montserrat",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#f9f9f9",
  },
  dateText: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  dateSeparator: {
    fontSize: 16,
    fontFamily: "Poppins",
    color: "#2C2F33",
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  totalContainer: {
    paddingHorizontal: 10,
  },
  totalCard: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignItems: "center",
  },
  totalTitle: {
    fontSize: 16,
    fontFamily: "Montserrat",
    color: "#2C2F33",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins",
    color: "#0056B3",
    marginTop: 5,
  },
});
