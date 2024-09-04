import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Start from "./components/Start";
import Chat from "./components/Chat";

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/Poppins/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/Poppins/Poppins-Thin.ttf"),
    "Poppins-Medium": require("./assets/Poppins/Poppins-Medium.ttf"),
    "Poppins-ExtraBold": require("./assets/Poppins/Poppins-ExtraBold.ttf"),
    "Poppins-MediumItalic": require("./assets/Poppins/Poppins-MediumItalic.ttf"),
    "Poppins-ThinItalic": require("./assets/Poppins/Poppins-ThinItalic.ttf"),
    "Poppins-LightItalic": require("./assets/Poppins/Poppins-LightItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
