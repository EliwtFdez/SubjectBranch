import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image, Switch, Platform, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAccountData } from '../../utils/hooks/useAccountData'; 

type RootStackParamList = {
  Settings: undefined;
  Home: undefined;
  // Agrega aquí otras pantallas si las tienes, por ejemplo: Login: undefined;
};

type Props = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

export default function AccountScreen() {
  const navigation = useNavigation<Props>();

  const {
    formData,
    notificaciones,
    setNotificaciones,
    handleInputChange,
    handleSemestreChange,
    handleSave
  } = useAccountData();

  // Confirmar cierre de sesión
  const handleCerrarSesion = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí',
          onPress: async () => {
            // Limpia AsyncStorage o maneja tu lógica de logout
            // Por ejemplo:
            // await AsyncStorage.removeItem('@user_data');
            Alert.alert('Sesión cerrada', 'Has cerrado sesión exitosamente.');
          }
        }
      ],
      { cancelable: true }
    );
  };

  // Guardar datos y dar feedback al usuario
  const onSavePress = async () => {
    const success = await handleSave();
    if (success) {
      Alert.alert('¡Éxito!', 'Tus cambios se han guardado correctamente.', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } else {
      Alert.alert('Error', 'No se pudieron guardar los cambios.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* Sección del encabezado con avatar */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/120' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton} activeOpacity={0.7}>
              <MaterialIcons name="photo-camera" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contenedor del formulario */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          {/* Campo de nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              value={formData.nombre}
              onChangeText={(text) => handleInputChange('nombre', text)}
              placeholder="Cambia tu nombre"
              placeholderTextColor="#808080"
            />
          </View>

          {/* Campo de matrícula */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Matrícula</Text>
            <TextInput
              style={styles.input}
              value={formData.matricula}
              onChangeText={(text) => handleInputChange('matricula', text)}
              placeholder="Ingresa tu matrícula"
              placeholderTextColor="#808080"
            />
          </View>

          {/* Campo de semestre */}
          <View style={styles.semestreContainer}>
            <Text style={styles.label}>Semestre</Text>
            <View style={styles.semestreInputContainer}>
              <TextInput
                style={styles.semestreInput}
                value={formData.semestre}
                onChangeText={handleSemestreChange}
                placeholder="0-14"
                placeholderTextColor="#808080"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
          </View>

          {/* Campo de carrera */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Carrera</Text>
            <TextInput
              style={styles.input}
              value={formData.carrera}
              onChangeText={(text) => handleInputChange('carrera', text)}
              placeholder="Ingresa tu carrera"
              placeholderTextColor="#808080"
            />
          </View>

          {/* Sección de Preferencias */}
          <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Preferencias</Text>

          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Notificaciones</Text>
            <Switch
              value={notificaciones}
              onValueChange={setNotificaciones}
              trackColor={{ false: '#404040', true: '#666666' }}
              thumbColor={notificaciones ? '#FFFFFF' : '#BDBDBD'}
            />
          </View>

          {/* Botón de guardar */}
          <TouchableOpacity style={styles.saveButton} onPress={onSavePress}>
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>

          {/* Botón de cerrar sesión */}
          <TouchableOpacity
            style={[styles.saveButton, styles.logoutButton]}
            onPress={handleCerrarSesion}
          >
            <Text style={styles.saveButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingTop: Platform.OS === 'ios' ? 20 : 10
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30
  },
  avatarContainer: {
    position: 'relative'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#808080'
  },
  editAvatarButton: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#404040',
    padding: 8,
    borderRadius: 20
  },
  formContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 20
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 20
  },
  inputGroup: {
    marginBottom: 20
  },
  label: {
    color: '#BDBDBD',
    marginBottom: 8,
    fontSize: 16
  },
  input: {
    backgroundColor: '#333333',
    borderRadius: 12,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4A4A4A'
  },
  semestreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  semestreInputContainer: {
    width: 70,
    height: 45,
    backgroundColor: '#333333',
    borderRadius: 12,
    justifyContent: 'center',
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#4A4A4A'
  },
  semestreInput: {
    textAlign: 'center',
    height: 45,
    padding: 0,
    color: '#FFFFFF',
    fontSize: 18
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 8
  },
  preferenceText: {
    color: '#E0E0E0',
    fontSize: 18
  },
  saveButton: {
    backgroundColor: '#666666',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  logoutButton: {
    backgroundColor: '#4A4A4A',
    marginTop: 15
  }
});
