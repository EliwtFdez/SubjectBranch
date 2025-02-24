import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Materias() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Mi Horario</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <MaterialIcons name="add-circle" size={30} color="white" />
            <Text style={styles.buttonText}>Agregar Materia</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scheduleContainer}>
          <Text style={styles.emptyText}>No hay materias agregadas</Text>
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
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 30
  },
  addButton: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10
  },
  scheduleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20
  },
  emptyText: {
    color: '#808080',
    fontSize: 16
  }
});
