import React, { useState } from 'react';
import { Modal, TouchableOpacity, Text, StyleSheet, View, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useMateriasData } from '../../../../utils/hooks/useMateriasData';
import { useMateriaValidation } from '../../../../utils/hooks/useMateriasValidation';


export default function AddButton({ visible, onClose }: { visible: boolean, onClose: () => void }) {
  const { addMateria } = useMateriasData();
  const { validarCampos, mostrarErrores } = useMateriaValidation();
  const [nombre, setMateria] = useState('');
  const [profesor, setProfesor] = useState('');
  const [aula, setAula] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [minutoInicio, setMinutoInicio] = useState('');
  const [periodoInicio, setPeriodoInicio] = useState('AM');
  const [horaFin, setHoraFin] = useState('');
  const [minutoFin, setMinutoFin] = useState('');
  const [periodoFin, setPeriodoFin] = useState('AM');

  const handleGuardar = async () => {
  const nuevaMateria = { nombre, profesor, aula, horaInicio, minutoInicio, periodoInicio, horaFin, minutoFin, periodoFin };

  if (validarCampos(nuevaMateria)) {
    const success = await addMateria(nuevaMateria);
    if (success) {
      Alert.alert('Éxito', 'Materia agregada correctamente');
      onClose();
    } else {
      Alert.alert('Error', 'No se pudo agregar la materia');
    }
  } else {
    mostrarErrores();
  }
};


  const handleHoraInicioChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 12)) {
      setHoraInicio(numericValue);
      if (numericValue) {
        let nuevaHoraFin = parseInt(numericValue) + 1;
        let nuevoPeriodoFin = periodoInicio;
        if (nuevaHoraFin > 12) {
          nuevaHoraFin = 1;
          nuevoPeriodoFin = periodoInicio === 'AM' ? 'PM' : 'AM';
        }
        setHoraFin(nuevaHoraFin.toString());
        setPeriodoFin(nuevoPeriodoFin);
      }
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Agregar Materia</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <TextInput style={styles.input} placeholder="Nombre de la materia" placeholderTextColor="#B0B0B0" value={nombre} onChangeText={setMateria} />
            <TextInput style={styles.input} placeholder="Nombre del profesor" placeholderTextColor="#B0B0B0" value={profesor} onChangeText={setProfesor} />
            <TextInput style={styles.input} placeholder="Aula" placeholderTextColor="#B0B0B0" value={aula} onChangeText={setAula} />
            <View style={styles.horasContainer}>
              <View style={styles.horaGroup}>
                <Text style={styles.horaLabel}>Hora Inicio:</Text>
                <TextInput style={styles.timeInput} placeholder="00" placeholderTextColor="#B0B0B0" value={horaInicio} onChangeText={handleHoraInicioChange} maxLength={2} keyboardType="numeric" />
              </View>
              <View style={styles.horaGroup}>
                <Text style={styles.horaLabel}>Hora Fin:</Text>
                <TextInput style={styles.timeInput} placeholder="00" placeholderTextColor="#B0B0B0" value={horaFin} editable={false} />
              </View>
            </View>
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#121212', width: '90%', borderRadius: 10, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  formContainer: { width: '100%' },
  input: { backgroundColor: '#1E1E1E', padding: 10, borderRadius: 5, color: 'white', marginBottom: 10 },
  horasContainer: { marginBottom: 10 },
  horaGroup: { marginBottom: 15 },
  horaLabel: { color: 'white', marginBottom: 5, fontSize: 16 },
  timeInput: { backgroundColor: '#2C2C2C', color: 'white', width: 50, textAlign: 'center', padding: 8, borderRadius: 5 },
  saveButton: { backgroundColor: '#BB86FC', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#121212', fontSize: 16, fontWeight: 'bold' }
});


