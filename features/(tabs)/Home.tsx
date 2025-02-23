import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import NavBar from "../navbar/Navbar";

// Definir el tipo de rutas disponibles
type RootStackParamList = {
  Home: undefined;
  Horario: undefined;
  Materias: undefined;
  Tareas: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={[styles.safeContainer]}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        {/* Perfil del Estudiante */}
        <View style={styles.profileContainer}>
          <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>David Saito</Text>
            <Text style={styles.privacySubtitle}>Semestre 6</Text>
          </View>
        </View>
        
        {/* Botones principales */}
        <View style={styles.mainButtonsContainer}>
          <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("Horario")}>  
            <MaterialIcons name="schedule" size={30} color="white" />
            <Text style={styles.buttonText}>Horario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("Materias")}>  
            <MaterialIcons name="book" size={30} color="white" />
            <Text style={styles.buttonText}>Materias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("Tareas")}>  
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

        {/* <NavBar/>  cuando lo pongo aqui se me cae el navbar y no me deja ver el navbar ni carga nada*/}

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
  },
  optionsContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 10
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C'
  },
  optionText: {
    color: 'white',
    fontSize: 16
  }
});
