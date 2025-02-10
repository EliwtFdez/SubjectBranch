import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import stylesAuth from "../../utils/styles/stylesAuth";

// Definir el tipo de rutas disponibles
type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

// Aplicar el tipo correcto a useNavigation
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const goToSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View>
      <Text style={stylesAuth.title}>Home</Text>
      <Button title="Go to Settings" onPress={goToSettings} />
    </View>
  );
}
