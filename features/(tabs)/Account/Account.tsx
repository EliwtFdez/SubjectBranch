import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image, Switch, Platform, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAccountData } from '../../../utils/hooks/useAccountData';
import { auth } from '../../../services/configFireabase';
import { signOut, updateProfile } from "firebase/auth";

type RootStackParamList = {
  Settings: undefined;
  Home: undefined;
  Login: undefined;
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
    handleSave,
    handleLogout
  } = useAccountData();

  const handleCerrarSesion = async () => {
    try {
      const success = await handleLogout();
      if (success) {
        Alert.alert('¡Hasta pronto!', 'Tu sesión se ha cerrado.');
        navigation.navigate('Login');
      } else {
        throw new Error('Error al cerrar sesión');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar la sesión');
    }
  };

  const onSavePress = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        Alert.alert('Error', 'No hay usuario autenticado');
        return;
      }

      // Mostrar advertencia antes de guardar
      Alert.alert(
        '⚠️ Advertencia',
        'Al modificar tus datos se eliminarán tus materias y registros. ¿Deseas continuar?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Continuar',
            onPress: async () => {
              // Actualizar perfil de autenticación
              if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                  displayName: formData.nombre
                });
              }

              const success = await handleSave();

              if (success) {
                Alert.alert('¡Listo!', 'Tus datos se guardaron correctamente.', [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home')
                  }
                ]);
              } else {
                throw new Error('Error al guardar');
              }
            }
          }
        ]
      );
      
    } catch (error) {
      Alert.alert('Error', 'No pudimos guardar tus cambios. Inténtalo de nuevo.');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        
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

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Tu Información</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              value={formData.nombre}
              onChangeText={(text) => handleInputChange('nombre', text)}
              placeholder="Escribe tu nombre completo"
              placeholderTextColor="#808080"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tu Matrícula</Text>
            <TextInput
              style={styles.input}
              value={formData.matricula}
              onChangeText={(text) => handleInputChange('matricula', text)}
              placeholder="Ej: A01234567"
              placeholderTextColor="#808080"
            />
          </View>

          <View style={styles.semestreContainer}>
            <Text style={styles.label}>¿En qué semestre vas?</Text>
            <View style={styles.semestreInputContainer}>
              <TextInput
                style={styles.semestreInput}
                value={formData.semestre}
                onChangeText={handleSemestreChange}
                placeholder="1-14"
                placeholderTextColor="#808080"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>¿Qué estudias?</Text>
            <TextInput
              style={styles.input}
              value={formData.carrera}
              onChangeText={(text) => handleInputChange('carrera', text)}
              placeholder="Ej: Ingeniería en Sistemas"
              placeholderTextColor="#808080"
            />
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Personalización</Text>

          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>¿Quieres recibir notificaciones?</Text>
            <Switch
              value={notificaciones}
              onValueChange={setNotificaciones}
              trackColor={{ false: '#404040', true: '#666666' }}
              thumbColor={notificaciones ? '#FFFFFF' : '#BDBDBD'}
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={onSavePress}>
            <Text style={styles.saveButtonText}>Guardar Mis Datos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveButton, styles.logoutButton]}
            onPress={handleCerrarSesion}
          >
            <Text style={styles.saveButtonText}>Salir de Mi Cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
