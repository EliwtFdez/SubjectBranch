import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Calendar, DateData } from 'react-native-calendars';

export default function Tareas() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState<string>('');

  const calendarTheme: CalendarTheme = {
    backgroundColor: '#1E1E1E',
    calendarBackground: '#1E1E1E',
    textSectionTitleColor: '#BB86FC',
    selectedDayBackgroundColor: '#BB86FC',
    selectedDayTextColor: '#121212', 
    todayTextColor: '#BB86FC',
    dayTextColor: 'white',
    textDisabledColor: '#444444',
    monthTextColor: 'white'
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>

        {/* Cabecera con botón de retroceso, título y botón de agregar */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Tareas</Text>
          <TouchableOpacity
            onPress={() => {
              // Aquí iría la lógica para abrir el modal de agregar tarea
              // con selector de materia y fecha
            }}
          >
            <MaterialIcons name="add-circle" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Calendario para seleccionar fechas */}
      <Calendar
          style={styles.calendar}
          theme={calendarTheme}
          onDayPress={(day: DateData) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {selected: true}
          }}
        />

        {/* Contenedor para mostrar las tareas del día seleccionado */}
        <View style={styles.tasksContainer}>
          <Text style={styles.emptyText}>No hay tareas para este día</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#121212'
  },
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  backButton: {
    marginRight: 15
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
  },
  tasksContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    marginTop: 20
  },
  emptyText: {
    color: '#808080',
    fontSize: 16
  }
});
