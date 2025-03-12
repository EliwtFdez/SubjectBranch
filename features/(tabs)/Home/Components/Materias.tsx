import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AddButton from './AddButtonMateria';
import { useMateriasData } from '../../../../utils/hooks/useMateriasData';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { List, Surface, IconButton } from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  EditarMateria: { materiaId: string };
};

export default function Materias() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showModal, setShowModal] = useState(false);

  // Hook personalizado que maneja la lógica de datos de materias
  const { materias, loading, error, deleteMateria } = useMateriasData();

  /**
   * Renderiza los botones de acción (editar/eliminar) que aparecen al deslizar una materia
   * @param materiaId - ID único de la materia
   */
  const renderRightActions = (materiaId: string) => {
    return (
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.editAction} 
          onPress={() => {
            navigation.navigate('EditarMateria', { materiaId });
          }}
        >
          <IconButton
            icon="pencil"
            iconColor="white"
            size={24}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteAction} 
          onPress={() => {
            Alert.alert(
              'Confirmar eliminación',
              '¿Está seguro que desea eliminar esta materia?',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel'
                },
                {
                  text: 'Eliminar',
                  onPress: () => deleteMateria(materiaId),
                  style: 'destructive'
                }
              ]
            );
          }}
        >
          <IconButton
            icon="delete"
            iconColor="white" 
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // Muestra un indicador de carga mientras se obtienen los datos
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

  // Muestra mensaje de error si algo falla
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

        {/* Botones para agregar materia y foto */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.addButton, styles.leftButton]}
            onPress={() => setShowModal(true)}
          >
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={styles.buttonText}>Agregar Materia</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.addButton, styles.rightButton]}
            onPress={() => {/* Lógica para foto */}}
          >
            <MaterialIcons name="photo-camera" size={24} color="white" />
            <Text style={styles.buttonText}>Foto Materias</Text>
          </TouchableOpacity>
        </View>

        {/* Renderizado condicional: mensaje si no hay materias o lista de materias */}
        {materias.length === 0 ? (
          <View style={styles.scheduleContainer}>
            <Text style={styles.emptyText}>No hay materias agregadas</Text>
          </View>
        ) : (
          <View style={styles.materiasGrid}>
            {materias.map((materia) => (
              <Swipeable
                key={materia.id}
                renderRightActions={() => renderRightActions(materia.id || '')}
                overshootRight={false}
              >
                <Surface style={styles.surface} elevation={2}>
                  <List.Item
                    title={<Text style={styles.materiaNombre}>{materia.nombre}</Text>}
                    description={
                      <View>
                        <Text style={styles.materiaDetalle}>Profesor: {materia.profesor}</Text>
                        <Text style={styles.materiaDetalle}>Aula: {materia.aula}</Text>
                        <Text style={styles.materiaDetalle}>
                          Horario: {materia.horaInicio}:{materia.minutoInicio} {materia.periodoInicio} - 
                          {materia.horaFin}:{materia.minutoFin} {materia.periodoFin}
                        </Text>
                      </View>
                    }
                    left={props => <List.Icon {...props} icon="notebook" color="white" />}
                  />
                </Surface>
              </Swipeable>
            ))}
          </View>
        )}

        {/* Modal para agregar nueva materia */}
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
    marginBottom: 20,
    flexDirection: 'row',
    gap: 10
  },
  addButton: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftButton: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  rightButton: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
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
  surface: {
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
    width: '100%'
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
  actionContainer: {
    flexDirection: 'row',
    height: '90%',
  },
  editAction: {
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  deleteAction: {
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  }
});
