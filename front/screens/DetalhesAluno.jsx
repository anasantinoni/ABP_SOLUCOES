import { View, Text } from "react-native";
import { useTheme, Button } from "react-native-paper";

export default function DetalhesAluno({ navigation, route }) {
  const aluno = route.params.aluno;
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          width: "90%",
          padding: 10,
          backgroundColor: theme.colors.primary,
          marginBottom: 10,
          borderRadius: 10,
        }}
      >
        <Text>Nome: {aluno.nome}</Text>
        <Text>Idade: {aluno.idade}</Text>
        <Text>Cpf: {aluno.cpf}</Text>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Button
          style={{
            width: "90%",
          }}
          mode="contained"
          onPress={() => navigation.navigate("FinanceiroAluno", { aluno })}
        >
          Financeiro
        </Button>
        <Button
          style={{
            width: "90%",
          }}
          mode="contained"
          onPress={() => navigation.navigate("CadastrarAluno", { aluno })}
        >
          Editar Aluno
        </Button>
        <Button
          style={{
            width: "90%",
            backgroundColor: theme.colors.error,
          }}
          mode="contained"
          onPress={() => navigation.navigate("FinanceiroAluno", { aluno })}
        >
          Remover Aluno
        </Button>
      </View>
    </View>
  );
}
