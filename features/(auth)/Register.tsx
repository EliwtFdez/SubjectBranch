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
import { auth } from "../../services/Firebase/configFireabase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type NavigationProps = StackNavigationProp<AuthStackParamList, "Register">;

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    try {
      setError("");

      if (!name || !email || !password) {
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

      // Crear usuario en Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Actualizar el perfil del usuario con su nombre
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        navigation.replace("Home");
      }

    } catch (err: any) {
      let errorMessage = "Ocurrió un error durante el registro";

      // Manejar errores específicos de Firebase
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = "Este email ya está registrado";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Email inválido";
      } else if (err.code === 'auth/operation-not-allowed') {
        errorMessage = "Operación no permitida";
      } else if (err.code === 'auth/weak-password') {
        errorMessage = "La contraseña es muy débil";
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

          <Text style={styles.title}>¡Crea tu cuenta!</Text>
          <Text style={styles.subtitle}>Regístrate para comenzar</Text>

          <TextInput
            label="Nombre completo"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setError("");
            }}
            style={styles.input}
            autoCapitalize="words"
            disabled={isLoading}
            left={<TextInput.Icon icon="account" />}
            mode="outlined"
            theme={{ colors: { text: 'white', placeholder: 'white' } }}
            textColor="white"
          />

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
            left={<TextInput.Icon icon="email" />}
            mode="outlined"
            theme={{ colors: { text: 'white', placeholder: 'white' } }}
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
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon 
                icon={showPassword ? "eye-off" : "eye"} 
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            mode="outlined"
            theme={{ colors: { text: 'white', placeholder: 'white' } }}
            textColor="white"
          />

          {!!error && (
            <HelperText type="error" visible={!!error} style={styles.errorText}>
              {error}
            </HelperText>
          )}

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
            disabled={isLoading}
            contentStyle={styles.buttonContent}
          >
            {isLoading ? <ActivityIndicator color="white" /> : "Registrarse"}
          </Button>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerText}>
              ¿Ya tienes una cuenta? <Text style={styles.registerLink}>Inicia sesión</Text>
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
    color: "#F5F5F5",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#E0E0E0",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#3A3A3A",
    borderRadius: 8,
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#007AFF",
  },
  buttonContent: {
    height: 50,
  },
  errorText: {
    textAlign: "center",
    color: "#ff6b6b",
    marginBottom: 10,
  },
  registerText: {
    textAlign: "center",
    color: "#ddd",
    marginTop: 15,
  },
  registerLink: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
