import './gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import FinanceiroAluno from './screens/FinanceiroAluno';
import PesquisaAluno from './screens/PesquisaAluno';
import DetalhesAluno from './screens/DetalhesAluno';
import CadastrarAluno from './screens/CadastrarAluno';
import Agenda from './screens/Agenda';
import Login from './screens/Login';


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
    error: '#ff0000',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="FinanceiroAluno" component={FinanceiroAluno} />
          <Drawer.Screen name="PesquisaAluno" component={PesquisaAluno} />
          <Drawer.Screen options={{ drawerItemStyle: { display: "none" } }} name="DetalhesAluno" component={DetalhesAluno} />
          <Drawer.Screen options={{ drawerItemStyle: { display: 'none' } }} name="CadastrarAluno" component={CadastrarAluno} />
          <Drawer.Screen name="Agenda" component={Agenda} />
          <Drawer.Screen options={{
            headerShown: false,
            drawerItemStyle: { display: 'none' }
          }} name="Login" component={Login} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
