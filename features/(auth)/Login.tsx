import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import stylesAuth from "../../utils/styles/stylesAuth";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    if(email == ""){
     navigation.replace("Home"); // Reemplaza Login con Home
    }
  };

  const handleLogin = async () => {
    try {
      setError("");
      
      // Basic validation
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }

      if (!validateEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      setIsLoading(true);
      // Here you would typically make an API call to authenticate
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      console.log("Email:", email);
      console.log("Password:", password);
      
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
      
      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : null}

      <Button
        mode="contained"
        onPress={handleLogin}
        style={stylesAuth.button}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="white" /> : "Login"}
      </Button>

      <Text 
        style={stylesAuth.link} 
        onPress={() => !isLoading && navigation.navigate("Register")}
      >
        Don't have an account? Register
      </Text>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
