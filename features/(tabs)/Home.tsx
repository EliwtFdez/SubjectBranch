import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import styles from "../../utils/styles/stylesTabs";
import NavBar from "../navbar/Navbar";

// Definir el tipo de rutas disponibles
type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
  Wallet: undefined;
  Activity: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <ScrollView>
          {/* Perfil */}
          <View style={styles.profileContainer}>
            <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>David Saito</Text>
              <View style={styles.ratingContainer}>
                <MaterialIcons name="star" size={16} color="gold" />
                <Text style={styles.rating}>5.00</Text>
              </View>
            </View>
          </View>
          
          {/* Botones principales */}
          <View style={styles.mainButtonsContainer}>
            <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("Settings")}>  
              <MaterialIcons name="help-outline" size={30} color="white" />
              <Text style={styles.buttonText}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("Wallet")}>  
              <MaterialIcons name="account-balance-wallet" size={30} color="white" />
              <Text style={styles.buttonText}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate("Activity")}>  
              <MaterialIcons name="history" size={30} color="white" />
              <Text style={styles.buttonText}>Activity</Text>
            </TouchableOpacity>
          </View>

          {/* Privacidad */}
          <View style={styles.privacyContainer}>
            <Ionicons name="lock-closed-outline" size={30} color="white" />
            <View>
              <Text style={styles.privacyTitle}>Privacy checkup</Text>
              <Text style={styles.privacySubtitle}>Take an interactive tour of your privacy settings</Text>
            </View>
          </View>

          {/* Opciones adicionales */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Settings</Text></TouchableOpacity>
            <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Messages</Text></TouchableOpacity>
            <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Setup your business profile</Text></TouchableOpacity>
            <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Manage Uber account</Text></TouchableOpacity>
            <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Legal</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    <NavBar/>;
    </SafeAreaView>
  );
}

