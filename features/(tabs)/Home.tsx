import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const goToSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="Go to Settings" onPress={goToSettings} />
    </View>
  );
}
