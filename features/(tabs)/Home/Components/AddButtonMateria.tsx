import React, { useState } from 'react';
import { Modal, TouchableOpacity, Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMateriasData } from '../../../../utils/hooks/useMateriasData';

export default function AddButton({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { addMateria } = useMateriasData();
  const [materia, setMateria] = useState('');
  const [profesor, setProfesor] = useState('');
  const [aula, setAula] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [minutoInicio, setMinutoInicio] = useState('');
  const [periodoInicio, setPeriodoInicio] = useState('AM');
  const [horaFin, setHoraFin] = useState('');
  const [minutoFin, setMinutoFin] = useState('');
  const [periodoFin, setPeriodoFin] = useState('AM');

  const validarHora = (hora: string, minuto: string) => {
    const horaNum = parseInt(hora);
    const minutoNum = parseInt(minuto);
    return horaNum >= 1 && horaNum <= 12 && minutoNum >= 0 && minutoNum <= 59;
  };

  const validarCampos = () => {
    if (!materia.trim()) {
      Alert.alert('Error', 'Por favor ingrese el nombre de la materia');
      return false;
    }
    if (!profesor.trim()) {
      Alert.alert('Error', 'Por favor ingrese el nombre del profesor');
      return false;
    }
    if (!aula.trim()) {
      Alert.alert('Error', 'Por favor ingrese el aula');
      return false;
    }
    if (!validarHora(horaInicio, minutoInicio)) {
      Alert.alert('Error', 'Por favor ingrese una hora de inicio válida');
      return false;
    }
    if (!validarHora(horaFin, minutoFin)) {
      Alert.alert('Error', 'Por favor ingrese una hora de fin válida');
      return false;
    }
    return true;
  };

  const handleGuardar = async () => {
    if (validarCampos()) {
      const nuevaMateria = {
        nombre: materia,
        profesor,
        aula,
        horaInicio,
        minutoInicio,
        periodoInicio,
        horaFin,
        minutoFin,
        periodoFin
      };

      try {
        const success = await addMateria(nuevaMateria);
        if (success) {
          Alert.alert('Éxito', 'Materia agregada correctamente');
          // Limpiar el formulario
          setMateria('');
          setProfesor('');
          setAula('');
          setHoraInicio('');
          setMinutoInicio('');
          setHoraFin('');
          setMinutoFin('');
          setPeriodoInicio('AM');
          setPeriodoFin('AM');
          onClose();
        } else {
          Alert.alert('Error', 'No se pudo agregar la materia');
        }
      } catch (error) {
        Alert.alert('Error', 'Ocurrió un error al guardar la materia');
      }
    }
  };

  const handleNumericInput = (text: string, setter: (value: string) => void, max: number) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue === '' || (parseInt(numericValue) <= max)) {
      setter(numericValue);
    }
  };

  const togglePeriodo = (periodo: string, setPeriodo: (value: string) => void) => {
    setPeriodo(periodo === 'AM' ? 'PM' : 'AM');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Overlay semi-transparente que cubre toda la pantalla */}
      <View style={styles.modalOverlay}>

        {/* Contenedor principal del modal */}
        <View style={styles.modalContent}>

          {/* Cabecera del modal con título y botón de cerrar */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Agregar Materia</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            {/* Campo para ingresar el nombre de la materia */}
            <TextInput 
              style={styles.input}
              placeholder="Nombre de la materia"
              placeholderTextColor="#808080"
              value={materia}
              onChangeText={setMateria}
            />
            {/* Campo para ingresar el nombre del profesor */}
            <TextInput
              style={styles.input}
              placeholder="Nombre del profesor"
              placeholderTextColor="#808080" 
              value={profesor}
              onChangeText={setProfesor}
            />
            {/* Campo para ingresar el aula */}
            <TextInput
              style={styles.input}
              placeholder="Aula"
              placeholderTextColor="#808080"
              value={aula}
              onChangeText={setAula}
            />
            
            {/* Contenedor para los campos de hora */}
            <View style={styles.horasContainer}>
              <View style={styles.horaGroup}>
                <Text style={styles.horaLabel}>Hora Inicio:</Text>
                <View style={styles.timeInputContainer}>
                  <TextInput
                    style={styles.timeInput}
                    placeholder="00"
                    placeholderTextColor="#808080"
                    value={horaInicio}
                    onChangeText={(text) => handleNumericInput(text, setHoraInicio, 12)}
                    maxLength={2}
                    keyboardType="numeric"
                  />
                  <Text style={styles.timeLabel}>h</Text>
                  <TextInput
                    style={styles.timeInput}
                    placeholder="00"
                    placeholderTextColor="#808080"
                    value={minutoInicio}
                    onChangeText={(text) => handleNumericInput(text, setMinutoInicio, 59)}
                    maxLength={2}
                    keyboardType="numeric"
                  />
                  <Text style={styles.timeLabel}>m</Text>
                  <TouchableOpacity 
                    style={styles.periodoButton}
                    onPress={() => togglePeriodo(periodoInicio, setPeriodoInicio)}
                  >
                    <Text style={styles.periodoText}>{periodoInicio}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.horaGroup}>
                <Text style={styles.horaLabel}>Hora Fin:</Text>
                <View style={styles.timeInputContainer}>
                  <TextInput
                    style={styles.timeInput}
                    placeholder="00"
                    placeholderTextColor="#808080"
                    value={horaFin}
                    onChangeText={(text) => handleNumericInput(text, setHoraFin, 12)}
                    maxLength={2}
                    keyboardType="numeric"
                  />
                  <Text style={styles.timeLabel}>h</Text>
                  <TextInput
                    style={styles.timeInput}
                    placeholder="00"
                    placeholderTextColor="#808080"
                    value={minutoFin}
                    onChangeText={(text) => handleNumericInput(text, setMinutoFin, 59)}
                    maxLength={2}
                    keyboardType="numeric"
                  />
                  <Text style={styles.timeLabel}>m</Text>
                  <TouchableOpacity 
                    style={styles.periodoButton}
                    onPress={() => togglePeriodo(periodoFin, setPeriodoFin)}
                  >
                    <Text style={styles.periodoText}>{periodoFin}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Botón para guardar el formulario */}
            <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  ); 
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#1E1E1E',
    width: '90%',
    borderRadius: 10,
    padding: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  formContainer: {
    width: '100%'
  },
  input: {
    backgroundColor: '#2C2C2C',
    padding: 10,
    borderRadius: 5,
    color: 'white',
    marginBottom: 10
  },
  horasContainer: {
    marginBottom: 10
  },
  horaGroup: {
    marginBottom: 15
  },
  horaLabel: {
    color: 'white',
    marginBottom: 5,
    fontSize: 16
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2C',
    borderRadius: 5,
    padding: 10
  },
  timeInput: {
    backgroundColor: '#1E1E1E',
    color: 'white',
    width: 50,
    textAlign: 'center',
    padding: 8,
    borderRadius: 5,
    marginRight: 5
  },
  timeLabel: {
    color: 'white',
    marginRight: 15,
    fontSize: 16
  },
  periodoButton: {
    backgroundColor: '#1E1E1E',
    padding: 8,
    borderRadius: 5,
    minWidth: 45,
    alignItems: 'center'
  },
  periodoText: {
    color: 'white',
    fontSize: 16
  },
  saveButton: {
    backgroundColor: '#BB86FC',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  saveButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
