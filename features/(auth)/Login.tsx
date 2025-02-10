import React, { useState } from "react";
import { KeyboardAvoidingView,Platform,ActivityIndicator,View} from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import stylesAuth from "../../utils/styles/stylesAuth";

const LoginScreen = () => {
  const navigation = useNavigation(); // Usamos React Navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Helper function for email validation only
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      setError("");

      // Basic validation checks
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

      // Set loading to true
      setIsLoading(true);

      // Simulated "API call" (1-second delay)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Email:", email);
      console.log("Password:", password);

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

      {/* Navigate to Register */}
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
