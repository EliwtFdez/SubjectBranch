import React, { useState } from "react";
import {KeyboardAvoidingView, Platform, ActivityIndicator, View,Image,StyleSheet} from "react-native";
import { TextInput, Button, Text, HelperText, Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import stylesAuth from "../../utils/styles/stylesAuth";

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigation.replace("Home");
      
    } catch (err) {
      setError("Ocurrió un error durante el registro");
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

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>O</Text>
          <View style={styles.line} />
        </View>

        <Text
          style={styles.registerText}
          onPress={() => !isLoading && navigation.navigate("Login")}
        >
          ¿Ya tienes una cuenta? <Text style={styles.registerLink}>Inicia sesión</Text>
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

export default RegisterScreen;
