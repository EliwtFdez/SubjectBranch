import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type Clase = {
  hora: string;
  materia: string;
  aula: string;
}

type Horarios = {
  [key in 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo']: Clase[];
}

const Horario = () => {
  const navigation = useNavigation();
  const [diaSeleccionado, setDiaSeleccionado] = useState<keyof Horarios>('Lunes');
  const [selectedDate, setSelectedDate] = useState('');
  
  const horarios: Horarios = {
    Lunes: [
      { hora: '7:00 - 8:30', materia: 'Matemáticas', aula: 'A101' },
      { hora: '9:00 - 10:30', materia: 'Física', aula: 'B203' },
    ],
    Martes: [
      { hora: '8:00 - 9:30', materia: 'Química', aula: 'Lab 1' },
      { hora: '10:00 - 11:30', materia: 'Historia', aula: 'C304' },
    ],
    Miércoles: [
      { hora: '7:30 - 9:00', materia: 'Literatura', aula: 'D405' },
      { hora: '9:30 - 11:00', materia: 'Inglés', aula: 'E506' },
    ],
    Jueves: [
      { hora: '8:00 - 9:30', materia: 'Biología', aula: 'Lab 2' },
      { hora: '10:00 - 11:30', materia: 'Arte', aula: 'F607' },
    ],
    Viernes: [
      { hora: '7:00 - 8:30', materia: 'Educación Física', aula: 'Gimnasio' },
      { hora: '9:00 - 10:30', materia: 'Música', aula: 'G708' },
    ],
    Sábado: [],
    Domingo: []
  };

  const diasCompletos = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] as const;
  const diasAbreviados = ['L', 'M', 'Mi', 'J', 'V', 'S', 'D'];

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabecera con botón de retroceso y título */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Mi Horario</Text>
      </View>

      {/* Barra de selección de días */}
      <View style={styles.diasHeader}>
        {diasAbreviados.map((dia, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => setDiaSeleccionado(diasCompletos[index])}
            style={[
              styles.diaButton,
              diasCompletos[index] === diaSeleccionado && styles.diaButtonSelected
            ]}
          >
            <Text style={[
              styles.diaAbreviado,
              diasCompletos[index] === diaSeleccionado && styles.diaAbreviadoSelected
            ]}>
              {dia}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenido principal con el horario del día */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.diaContainer}>
          <Text style={[styles.diaTitle, { textAlign: 'center' }]}>{diaSeleccionado}</Text>
          {horarios[diaSeleccionado].length > 0 ? (
            horarios[diaSeleccionado].map((clase, index) => (
              <View key={index} style={styles.claseContainer}>
                <View style={styles.claseContainer}>
                  <Text style={styles.hora}>{clase.hora}</Text>
                  <Text style={styles.materia}>{clase.materia}</Text>
                  <Text style={styles.aula}>{clase.aula}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noClases}>No hay clases</Text>
          )}
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos de la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginRight: 43,
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 4,
  },
  diasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1E1E1E',
    paddingVertical: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  diaButton: {
    padding: 8,
    borderRadius: 4,
  },
  diaButtonSelected: {
    backgroundColor: '#BB86FC',
  },
  diaAbreviado: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  diaAbreviadoSelected: {
    color: '#121212',
  },
  scrollContent: {
    alignItems: 'center',
  },
  diaContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  diaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  claseContainer: {
    backgroundColor: '#2C2C2C',
    borderRadius: 6,
    padding: 12,
    marginBottom: 8,
  },
  hora: {
    fontSize: 16,
    color: '#BB86FC',
    marginBottom: 4,
  },
  materia: {
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
  aula: {
    fontSize: 12,
    color: '#808080',
  },
  noClases: {
    color: '#808080',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Horario;
