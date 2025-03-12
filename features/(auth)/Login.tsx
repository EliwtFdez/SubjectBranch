import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { TextInput, Button, Text, HelperText, Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../../services/configFireabase";
import { signInWithEmailAndPassword } from "firebase/auth";

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type NavigationProps = StackNavigationProp<AuthStackParamList, "Login">;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      setError("");

      if (!email || !password) {
        setError("Por favor complete todos los campos");
        return;
      }

      if (!isEmailValid(email)) {
        setError("Por favor ingrese un email válido");
        return;
      }

      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      setIsLoading(true);

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        navigation.replace("Home");
      }

    } catch (err: any) {
      let errorMessage = "Ocurrió un error durante el inicio de sesión";

      if (err.code === 'auth/user-not-found') {
        errorMessage = "No existe una cuenta con este email";
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = "Contraseña incorrecta";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Email inválido";
      }

      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#1E293B", "#243B55"]} style={styles.background}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Surface style={styles.loginCard} elevation={5}>
          <Image source={require('../../assets/images/App.png')} style={styles.logo} resizeMode="contain" />

          <Text style={styles.title}>¡Bienvenido de vuelta!</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            disabled={isLoading}
            left={<TextInput.Icon icon="email" color="white" />}
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor="white"
            theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
            textColor="white"
          />

          <TextInput
            label="Contraseña"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError("");
            }}
            secureTextEntry={!showPassword}
            style={styles.input}
            disabled={isLoading}
            left={<TextInput.Icon icon="lock" color="white" />}
            right={
              <TextInput.Icon 
                icon={showPassword ? "eye-off" : "eye"} 
                onPress={() => setShowPassword(!showPassword)}
                color="white"
              />
            }
            mode="flat"
            underlineColor="transparent"
            activeUnderlineColor="white"
            theme={{ colors: { text: 'white', placeholder: 'white', primary: 'white' } }}
            textColor="white"
          />

          {!!error && (
            <HelperText type="error" visible={!!error} style={styles.errorText}>
              {error}
            </HelperText>
          )}

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            disabled={isLoading}
            contentStyle={styles.buttonContent}
          >
            {isLoading ? <ActivityIndicator color="white" /> : "Iniciar Sesión"}
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>
              ¿No tienes una cuenta? <Text style={styles.registerLink}>Regístrate</Text>
            </Text>
          </TouchableOpacity>
        </Surface>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  loginCard: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: "rgba(30, 30, 30, 0.95)",
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "transparent", // Fondo transparente
    borderBottomColor: "white", // Solo una línea blanca debajo
    borderBottomWidth: 1,
    color: "white",
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#007AFF", // Azul
  },
  buttonContent: {
    height: 50,
  },
  errorText: {
    textAlign: "center",
    color: "#FF6B6B",
    marginBottom: 10,
  },
  registerText: {
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 15,
  },
  registerLink: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default LoginScreen;
