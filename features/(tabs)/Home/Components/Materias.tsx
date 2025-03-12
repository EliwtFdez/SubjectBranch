import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, Alert, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AddButton from './AddButtonMateria';
import { useMateriasData } from '../../../../utils/hooks/useMateriasData';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { List, Surface, IconButton } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  EditarMateria: { materiaId: string };
};

export default function Materias() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showModal, setShowModal] = useState(false);
  const { materias, loading, error, deleteMateria } = useMateriasData();

  // Estado animado inicializado correctamente
  const animatedValues = useRef<{ [key: string]: Animated.Value }>({}).current;

  // Sincronizar animatedValues con materias
  useEffect(() => {
    materias.forEach((materia) => {
      if (!animatedValues[materia.id]) {
        animatedValues[materia.id] = new Animated.Value(1);
      }
    });
  }, [materias]);

  /**
   * Maneja la eliminación con animación
   * @param materiaId - ID único de la materia
   */
  const handleDelete = (materiaId: string) => {
    Animated.timing(animatedValues[materiaId], {
      toValue: 0, // Se desvanece
      duration: 300, // Duración de la animación
      useNativeDriver: true,
    }).start(() => deleteMateria(materiaId)); // Elimina después de la animación
  };

  const renderRightActions = (materiaId: string) => {
    return (
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.editAction} 
          onPress={() => navigation.navigate('EditarMateria', { materiaId })}
        >
          <IconButton icon="pencil" iconColor="white" size={24} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteAction} 
          onPress={() => {
            Alert.alert(
              'Confirmar eliminación',
              '¿Está seguro que desea eliminar esta materia?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => handleDelete(materiaId), style: 'destructive' }
              ]
            );
          }}
        >
          <IconButton icon="delete" iconColor="white" size={24} />
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
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Mis Materias</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.addButton, styles.leftButton]} onPress={() => setShowModal(true)}>
            <MaterialIcons name="add" size={24} color="white" />
            <Text style={styles.buttonText}>Agregar Materia</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.addButton, styles.rightButton]} onPress={() => {}}>
            <MaterialIcons name="photo-camera" size={24} color="white" />
            <Text style={styles.buttonText}>Foto Materias</Text>
          </TouchableOpacity>
        </View>

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
                <Animated.View
                  style={[
                    styles.animatedContainer,
                    { 
                      opacity: animatedValues[materia.id] || 1, // Manejar inicialización
                      transform: [{ scale: animatedValues[materia.id] || 1 }] // Efecto de escala
                    }
                  ]}
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
                </Animated.View>
              </Swipeable>
            ))}
          </View>
        )}

        <AddButton visible={showModal} onClose={() => setShowModal(false)} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  animatedContainer: {
    overflow: 'hidden',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#BB86FC',
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButton: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightButton: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  scheduleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
    minHeight: 200,
  },
  emptyText: {
    color: '#808080',
    fontSize: 16,
  },
  materiasGrid: {
    gap: 15,
  },
  surface: {
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#1E1E1E',
    width: '100%',
  },
  materiaNombre: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  materiaDetalle: {
    color: '#808080',
    fontSize: 14,
    marginBottom: 5,
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
  },
  deleteAction: {
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
});
