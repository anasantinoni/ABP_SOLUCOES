import { Text, View, StyleSheet } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { Image } from "react-native";

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      <Image style={
        {
          width: 200,
          height: 200,
          marginBottom: 20
        }
      } source={require("../assets/images/logo.png")} />
      <View style={{ display: "flex", rowGap: 30 }}>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("PesquisaAluno");
          }}
        >
          Pesquisar Aluno
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("FinanceiroAluno");
          }}
        >
          Financeiro
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate("Agenda");
          }}
        >
          Agenda
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
});
