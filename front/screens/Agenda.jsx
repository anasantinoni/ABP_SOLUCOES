import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function CalendarScreen() {
  const [calendars, setCalendars] = useState([]);

  // Solicita permissões e carrega os calendários
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        setCalendars(calendars);
      } else {
        Alert.alert('Permissão necessária', 'Precisamos de acesso ao seu calendário.');
      }
    })();
  }, []);

  // Função para criar um evento simples
  const createEvent = async () => {
    try {
      const defaultCalendar = calendars.find((cal) => cal.isPrimary || cal.source.name === 'Default');

      if (!defaultCalendar) {
        Alert.alert('Erro', 'Nenhum calendário padrão encontrado.');
        return;
      }

      const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
        title: 'Meu Evento',
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hora
        timeZone: 'GMT',
        location: 'Local do Evento',
      });

      Alert.alert('Sucesso', `Evento criado com ID: ${eventId}`);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar o evento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendários Disponíveis:</Text>
      <FlatList
        data={calendars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.calendarItem}>
            <Text style={styles.calendarName}>{item.title}</Text>
            <Text>Tipo: {item.source.name}</Text>
          </View>
        )}
      />
      <Button title="Criar Evento" onPress={createEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  calendarItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  calendarName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
