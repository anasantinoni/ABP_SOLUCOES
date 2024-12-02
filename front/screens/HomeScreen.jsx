import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Button from "../components/Button";
import { logout, verifyAuth } from "../actions/auth";

export default function HomeScreen({ navigation }) {

  useEffect(() => {
    const isAuth = verifyAuth();
    if (!isAuth) {
      navigation.navigate("Login");
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* Título de boas-vindas */}
      <Text style={styles.title}>Bem-vindo!</Text>
      {/* Botões */}
      <View style={styles.buttonContainer}>
        <Button
          title="Alunos"
          icon="person"
          onPress={() => navigation.navigate("PesquisaAluno")}
          style={styles.button}
        />
        <Button
          title="Financeiro"
          icon="attach-money"
          onPress={() => navigation.navigate("FinanceiroAluno")}
          style={styles.button}
        />
        <Button
          title="Agenda"
          icon="event"
          onPress={() => navigation.navigate("Agenda")}
          style={styles.button}
        />
      </View>
      <View style={{
        position: "absolute",
        bottom: 10,
        width: "100%",
        alignItems: "center",
      }}>
        <Button
          title="Sair"
          icon="exit-to-app"
          onPress={() => {
            logout();
            navigation.navigate("Login");
          }}
          style={{
            width: "30%",
            height: 50,
            backgroundColor: "#ff0000", // Vermelho da paleta
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0056B3",
    marginBottom: 40,
    fontFamily: "Montserrat",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    marginVertical: 15,
    width: "90%",
    height: 50,
    backgroundColor: "#0056B3", // Azul da paleta
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
