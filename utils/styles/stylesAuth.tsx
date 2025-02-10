import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5", // Fondo suave
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333", // Texto oscuro
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#FFF", // Fondo blanco en inputs
  },
  button: {
    marginTop: 10,
  },
  link: {
    textAlign: "center",
    marginTop: 10,
    color: "#6200ee", // Color de link
  },
});

export default styles;
