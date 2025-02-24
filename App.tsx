import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./features/(auth)/Login";
import RegisterScreen from "./features/(auth)/Register"; 
import NavBar from "./features/navbar/Navbar";
import Materias from "./features/(tabs)/Materias";
import Horario from "./features/(tabs)/Horario";
import Tareas from "./features/(tabs)/Tareas";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={NavBar} />
        <Stack.Screen name="Materias" component={Materias} />
        <Stack.Screen name="Horario" component={Horario} />
        <Stack.Screen name="Tareas" component={Tareas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
