import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const goToSettings = () => {
    router.push("/(tabs)/Settings");
  };

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}
