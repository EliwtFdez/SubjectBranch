import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#121212" },
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  profileContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  name: { fontSize: 22, fontWeight: "bold", color: "white" },
  ratingContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  rating: { color: "white", marginLeft: 5 },
  mainButtonsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  mainButton: { backgroundColor: "#333", padding: 15, borderRadius: 10, alignItems: "center", width: "30%" },
  buttonText: { color: "white", marginTop: 5, fontSize: 14 },
  privacyContainer: { backgroundColor: "#1e1e1e", padding: 20, borderRadius: 10, flexDirection: "row", alignItems: "center", marginBottom: 20 },
  privacyTitle: { color: "white", fontWeight: "bold", fontSize: 16 },
  privacySubtitle: { color: "gray", fontSize: 14 },
  optionsContainer: { borderTopWidth: 1, borderTopColor: "gray", paddingTop: 15 },
  option: { paddingVertical: 10 },
  optionText: { color: "white", fontSize: 16 },
});

export default styles;