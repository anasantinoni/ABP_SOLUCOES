import { useState, useEffect } from "react"
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { loginUser, verifyAuth } from "../actions/auth";
import { useNavigation } from "@react-navigation/native";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const isAuth = verifyAuth();
    if (!isAuth) {
      navigation.navigate("Login");
    }
  }, []);

  async function handleLogin() {
    try {
      setLoading(true);
      await loginUser(email, password);
      setLoading(false);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/invalid-credential") {
        alert("Email ou senha inválidos ou usuário não existe");
      } else if (error.code === "auth/invalid-email") {
        alert("Email inválido ou senha incorreta");
      } else {
        alert("Erro ao logar");
      }
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
        onPress={() => handleLogin()}
        title="Login"
        loading={loading}
        mode="contained-tonal"
        buttonColor="#0056B3"
        textColor="#FFFFFF"
        disabled={loading}
      >
        Login
      </Button>
      <Text style={{ marginTop: 15 }}>
        Não tem uma conta?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Registro")}
        >
          Registro
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: "80%",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#0056B3",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  link: {
    color: "blue",
  },
});
