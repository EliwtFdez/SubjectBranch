import React, { useState } from "react";
import { 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator, 
  View 
} from "react-native";
import { 
  TextInput, 
  Button, 
  Text, 
  HelperText 
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; // 🔥 Importación corregida
import stylesAuth from "../../utils/styles/stylesAuth";

// Definir el tipo de las rutas en el StackNavigator
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

// Tipar correctamente la navegación
type NavigationProps = StackNavigationProp<AuthStackParamList, "Login">;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProps>(); // Usamos React Navigation con tipado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper function para validar emails
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      setError("");

      // Validaciones básicas
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      if (!isEmailValid(email)) {
        setError("Please enter a valid email address");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      // Activar el estado de carga
      setIsLoading(true);

      // Simulación de "API call" con retraso de 1 segundo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Email:", email);
      console.log("Password:", password);

      // Navegar a la pantalla Home después del login
      navigation.replace("Home");
      
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={stylesAuth.container}
    >
      <Text style={stylesAuth.title}>Welcome Back</Text>

      {/* Email */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
        style={stylesAuth.input}
        keyboardType="email-address"
        autoCapitalize="none"
        disabled={isLoading}
      />

      {/* Password */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError("");
        }}
        secureTextEntry
        style={stylesAuth.input}
        disabled={isLoading}
      />

      {/* Error HelperText */}
      {!!error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={stylesAuth.button}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="white" /> : "Login"}
      </Button>

      {/* Navegar a Register */}
      <Text
        style={stylesAuth.link}
        onPress={() => !isLoading && navigation.navigate("Register")}
      >
        Don&apos;t have an account? Register
      </Text>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
