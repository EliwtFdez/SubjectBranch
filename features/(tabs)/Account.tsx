import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Settings: undefined; 
  Home: undefined;
};

export default function AccountScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToSettings = () => {
    navigation.navigate("Home"); 
  };

  return (
    <View>
      <Text>Settings</Text>
      <Button title="Go to Settings" onPress={goToSettings} />
    </View>
  );
}
