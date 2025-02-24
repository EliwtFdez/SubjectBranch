import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AddButton from '../(components)/AddButton';
import { useMateriasData } from '../../utils/hooks/useMateriasData';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

export default function Materias() {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const { materias, loading, error, deleteMateria } = useMateriasData();

  const renderRightActions = (materiaId: string) => {
    return (
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => {
            // Lógica para editar
          }}
        >
          <MaterialIcons name="edit" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteMateria(materiaId)}
        >
          <MaterialIcons name="delete" size={20} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={[styles.container, styles.centerContent]}>
          <ActivityIndicator size="large" color="#BB86FC" />
          <Text style={styles.loadingText}>Cargando materias...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={[styles.container, styles.centerContent]}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container}>
        {/* Cabecera con botón de retroceso y título */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Mis Materias</Text>
        </View>

        {/* Botón para agregar nueva materia */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowModal(true)}
          >
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={styles.buttonText}>Agregar Materia</Text>
          </TouchableOpacity>
        </View>

        {materias.length === 0 ? (
          <View style={styles.scheduleContainer}>
            <Text style={styles.emptyText}>No hay materias agregadas</Text>
          </View>
        ) : (
          <GestureHandlerRootView style={styles.materiasGrid}>
            {materias.map((materia) => (
              <Swipeable
                key={materia.id}
                renderRightActions={() => renderRightActions(materia.id || '')} // asegurando que el id no sea null
                overshootRight={false}
              >
                <View style={styles.materiaCard}>
                  <View style={styles.materiaHeader}>
                    <Text style={styles.materiaNombre}>{materia.nombre}</Text>
                  </View>
                  <Text style={styles.materiaDetalle}>Profesor: {materia.profesor}</Text>
                  <Text style={styles.materiaDetalle}>Aula: {materia.aula}</Text>
                  <Text style={styles.materiaDetalle}>
                    Horario: {materia.horaInicio}:{materia.minutoInicio} {materia.periodoInicio} - 
                    {materia.horaFin}:{materia.minutoFin} {materia.periodoFin}
                  </Text>
                </View>
              </Swipeable>
            ))}
          </GestureHandlerRootView>
        )}

        <AddButton 
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
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
    marginBottom: 20
  },
  addButton: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
    padding: 20,
    borderRadius: 10,
    minHeight: 200
  },
  materiasGrid: {
    gap: 15
  },
  materiaCard: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10
  },
  materiaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  materiaNombre: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  materiaDetalle: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 5
  },
  emptyText: {
    color: '#808080',
    fontSize: 16
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: '#808080',
    fontSize: 16,
    marginTop: 10
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center'
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  actionButton: {
    padding: 8,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#2196F3'
  },
  deleteButton: {
    backgroundColor: '#f44336'
  }
});
