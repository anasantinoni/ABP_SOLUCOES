import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../actions/auth";


export default function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();


  const handleRegister = async () => {
    try {
      setLoading(true);
      await registerUser(email, password);
      navigation.navigate("Login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Este email já está em uso");
      } else {
        alert("Ocorreu um erro ao registrar o usuário");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        value={email}
        label="Email"
        mode="outlined"
        style={styles.input}
        onChangeText={setEmail}
      />
      <TextInput
        value={password}
        label="senha"
        mode="outlined"
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        onPress={() => handleRegister()}
        title="Registro"
        loading={loading}
        mode="contained-tonal"
        buttonColor="#0056B3"
        textColor="#FFFFFF"
      >
        Registro
      </Button>
      <Text style={{ marginTop: 15 }}>
        Já tem uma conta?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    marginBottom: 16,
  },
  link: {
    color: 'blue',
  },
});