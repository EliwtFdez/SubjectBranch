import React, { useState } from "react";
import {KeyboardAvoidingView,Platform,ActivityIndicator,View,Image,StyleSheet} from "react-native";
import { TextInput, Button, Text, HelperText, Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import stylesAuth from "../../utils/styles/stylesAuth";
import { auth } from "../../services/Firebase/configFireabase";
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
      
      // Autenticación con Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        navigation.replace("Home");
      }
      
    } catch (err: any) {
      let errorMessage = "Ocurrió un error durante el inicio de sesión";
      
      // Manejar errores específicos de Firebase
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[stylesAuth.container, styles.container]}
    >
      <Surface style={styles.loginCard}>
        <Image 
          source={require('../../assets/images/favicon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
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
          onPress={handleLogin}
          style={styles.button}
          disabled={isLoading}
          contentStyle={styles.buttonContent}
        >
          {isLoading ? <ActivityIndicator color="white" /> : "Iniciar Sesión"}
        </Button>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>O</Text>
          <View style={styles.line} />
        </View>

        <Text
          style={styles.registerText}
          onPress={() => !isLoading && navigation.navigate("Register")}
        >
          ¿No tienes una cuenta? <Text style={styles.registerLink}>Regístrate</Text>
        </Text>
      </Surface>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    padding: 20
  },
  loginCard: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#1E1E1E',
    elevation: 4,
    width: '100%'
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 30
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#2C2C2C'
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#007AFF'
  },
  buttonContent: {
    height: 48
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 10
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#333'
  },
  orText: {
    color: '#888',
    paddingHorizontal: 10
  },
  registerText: {
    textAlign: 'center',
    color: '#888'
  },
  registerLink: {
    color: '#007AFF',
    fontWeight: 'bold'
  }
});

export default LoginScreen;
