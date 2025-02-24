import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, database } from "../../services/Firebase/configFireabase";
import { ref, onValue } from "firebase/database";

type RootStackParamList = {
  Home: undefined;
  Materias: undefined;
  Horario: undefined;
  Tareas: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [userName, setUserName] = useState("Usuario");
  const [semestre, setSemestre] = useState("");
  const [carrera, setCarrera] = useState("");

  useEffect(() => {
    // Función para obtener datos del usuario
    const getUserData = () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = ref(database, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserName(data.nombre || user.displayName || "Usuario");
            setSemestre(data.semestre || "");
            setCarrera(data.carrera || "");
          }
        }, {
          // Asegurarse de obtener siempre los datos más recientes
          onlyOnce: false
        });
      }
    };

    // Suscribirse a los cambios de autenticación
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserData();
      } else {
        // Resetear estados si no hay usuario
        setUserName("Usuario");
        setSemestre("");
        setCarrera("");
      }
    });

    // Limpiar suscripción al desmontar
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Perfil del Estudiante */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{userName}</Text>
            <Text style={styles.privacySubtitle}>Semestre {semestre}</Text>
            <Text style={styles.privacySubtitle}>{carrera || "Sin carrera asignada"}</Text>
          </View>
        </View>


        {/* Botones principales */}
        <View style={styles.mainButtonsContainer}>
          <TouchableOpacity 
            style={styles.mainButton} 
            onPress={() => navigation.navigate('Materias')}
          >
            <MaterialIcons name="book" size={30} color="white" />
            <Text style={styles.buttonText}>Materias</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.mainButton} 
            onPress={() => navigation.navigate('Horario')}
          >
            <MaterialIcons name="schedule" size={30} color="white" />
            <Text style={styles.buttonText}>Horario</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.mainButton} 
            onPress={() => navigation.navigate('Tareas')}
          >
            <MaterialIcons name="assignment" size={30} color="white" />
            <Text style={styles.buttonText}>Tareas</Text>
          </TouchableOpacity>
        </View>

        {/* Próxima Clase */}
        <View style={styles.privacyContainer}>
          <MaterialIcons name="access-time" size={30} color="white" />
          <View>
            <Text style={styles.privacyTitle}>Próxima Clase</Text>
            <Text style={styles.privacySubtitle}>Matemáticas - 10:00 AM - Aula 201</Text>
          </View>
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
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  mainButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  mainButton: {
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '30%'
  },
  buttonText: {
    color: 'white',
    marginTop: 5
  },
  privacyContainer: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30
  },
  privacyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15
  },
  privacySubtitle: {
    color: '#808080',
    marginLeft: 15
  }
});