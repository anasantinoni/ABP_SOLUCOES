import { View, Text } from 'react-native'

export default function FinanceiroAluno({ route }) {
  const aluno = route.params.aluno

  return (
    <View style={{
      flex: 1,
      justifyContent: 'start',
      padding: 20,
      alignItems: 'center'
    }}>
      <Text>Financeiro Aluno</Text>
    </View>
  )
}