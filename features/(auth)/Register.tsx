import React, { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useRouter } from "expo-router"; // ✅ Cambiamos a Expo Router
import stylesAuth from "../../utils/styles/stylesAuth";

const RegisterScreen = () => {
  const router = useRouter(); // ✅ Usamos Expo Router
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={stylesAuth.container}
    >
      <Text style={stylesAuth.title}>Register</Text>

      <TextInput
        label="Full Name"
        value={name}
        onChangeText={setName}
        style={stylesAuth.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={stylesAuth.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={stylesAuth.input}
      />

      <Button mode="contained" onPress={handleRegister} style={stylesAuth.button}>
        Register
      </Button>

      {/* ✅ Cambiado navigation.goBack() a router.back() */}
      <Text style={stylesAuth.link} onPress={() => router.back()}>
        Already have an account? Login
      </Text>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
