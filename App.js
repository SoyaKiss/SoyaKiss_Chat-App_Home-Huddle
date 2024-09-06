import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { enableNetwork, disableNetwork } from "firebase/firestore";
import { Alert } from "react-native";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

import Start from "./components/Start";
import Chat from "./components/Chat";

const Stack = createNativeStackNavigator();

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCn7j6MhLkp-DiKrGIhM0EyyN3CdY0Timc",
  authDomain: "home-huddle-kiss.firebaseapp.com",
  projectId: "home-huddle-kiss",
  storageBucket: "home-huddle-kiss.appspot.com",
  messagingSenderId: "795304730979",
  appId: "1:795304730979:web:d75abc351505d7879b7356",
};

// Check if Firebase is already initialized, and initialize only if it hasn't been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

const storage = getStorage(app);

let auth;
try {
  // Check if auth has been initialized, otherwise initialize it
  auth = getAuth(); // Import `getAuth` from Firebase Auth
} catch (e) {
  if (e.code === "auth/already-initialized") {
    console.log("Auth already initialized");
  } else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
}

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

  // This is to track the connection status
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected) {
        enableNetwork(db).catch((error) => {
          console.error("Failed to enable Firestore network:", error);
        });
      } else {
        disableNetwork(db).catch((error) => {
          console.error("Failed to disable Firestore network:", error);
        });
        Alert.alert(
          "Connection Lost!",
          "Your device has lost its connection to the network.",
          [{ text: "OK " }]
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />

        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={isConnected} // Ensure isConnected is correctly referenced
              db={db}
              storage={storage} // Pass storage object here
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
