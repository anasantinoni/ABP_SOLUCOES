import './gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import PesquisaAluno from './components/PesquisaAluno';
import FinanceiroAluno from './components/FinanceiroAluno';
import DetalhesAluno from './components/DetalhesAluno';
import Agenda from './components/Agenda';

import { PaperProvider } from 'react-native-paper';

const Drawer = createDrawerNavigator();

const theme = {
  dark: false,
  colors: {
    primary: '#A9C9E0',
    secondary: '#0056b3',
    tertiary: '#2c2f22',
    background: 'white',
    card: 'white',
    text: 'black',
    border: 'black',
    notification: 'black',
  },
};

export default function App() {
  return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="PesquisaAluno" options={{
              title: 'Pesquisa de Aluno',
            }} component={PesquisaAluno}/>
            <Drawer.Screen name="FinanceiroAluno" options={{
              title: 'Financeiro',
            }} component={FinanceiroAluno}/>
            <Drawer.Screen name="Agenda" component={Agenda}/>
            <Drawer.Screen name="DetalhesAluno" options={{
              title: 'Detalhes do Aluno',
            }} component={DetalhesAluno}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
  );
}

