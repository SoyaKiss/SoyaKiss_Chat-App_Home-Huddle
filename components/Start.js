import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import { getAuth, signInAnonymously } from "firebase/auth";

import backgroundImage from "../assets/Background Image.png";

const Start = ({ navigation }) => {
  // for name
  const [text, setText] = useState("");
  // for background color options
  const [bgColor, setBgColor] = useState("");

  // This is for firebase authentication
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        // Check if the user is logged in
        if (result.user) {
          // Navigate to Chat
          navigation.navigate("Chat", {
            userName: text,
            bgColor: bgColor,
            userID: result.user.uid,
          });
          Alert.alert("Signed in Successfully!");
        } else {
          Alert.alert("No user logged in, please try again.");
        }
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      });
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <Text style={styles.appTitle}>Home Huddle</Text>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({ ios: 50, android: 80 })}
      >
        <View style={styles.container}>
          {/* Main interactive box */}
          <View style={styles.borderBox}>
            <TextInput
              style={styles.textInput}
              value={text}
              onChangeText={setText}
              placeholder="Your Name"
              placeholderTextColor="#757083"
            />

            <Text style={styles.chooseBackgroundColor}>
              Choose Background Color:
            </Text>

            {/* Color options section */}
            <View style={styles.colorOptions}>
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: "#090C08" }]}
                onPress={() => setBgColor("#090C08")}
                accessibilityRole="button"
                accessibilityLabel="Black color option"
                accessibilityHint="Selects black as the background color"
              />
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: "#474056" }]}
                onPress={() => setBgColor("#474056")}
                accessibilityRole="button"
                accessibilityLabel="Purple color option"
                accessibilityHint="Selects purple as the background color"
              />
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: "#8A95A5" }]}
                onPress={() => setBgColor("#8A95A5")}
                accessibilityRole="button"
                accessibilityLabel="Blue color option"
                accessibilityHint="Selects blue as the background color"
              />
              <TouchableOpacity
                style={[styles.colorCircle, { backgroundColor: "#B9C6AE" }]}
                onPress={() => setBgColor("#B9C6AE")}
                accessibilityRole="button"
                accessibilityLabel="Green color option"
                accessibilityHint="Selects green as the background color"
              />
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={signInUser}
              accessibilityRole="button"
              accessibilityLabel="Start chatting"
              accessibilityHint="Logs in the user and navigates to the chat screen"
            >
              <Text style={styles.startButtonText}>Start Chatting!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: screenWidth - 50,
    height: 667 * ((screenWidth - 50) / 375),
    resizeMode: "cover",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -(screenWidth - 50) / 2 },
      { translateY: -((667 * ((screenWidth - 50) / 375)) / 2) },
      { scale: 1.3 },
    ],
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    position: "absolute",
    top: 125,
  },
  borderBox: {
    bottom: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: 360,
    width: "88%",
    padding: 10,
    paddingTop: 50,
    paddingBottom: 40,
  },
  textInput: {
    // inner text styles
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    fontFamily: "Poppins-Medium",
    opacity: 0.5,
    // Outer box styles
    top: 85,
    width: "88%",
    height: 60,
    borderWidth: 2,
    borderColor: "#757083",
    padding: 10,
    borderRadius: 2,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "88%",
    marginBottom: 50,
  },
  chooseBackgroundColor: {
    fontSize: 16,
    fontWeight: "300",
    fontFamily: "Poppins-SemiBold",
    color: "#757083",
    marginBottom: 20,
    marginTop: 140,
    alignSelf: "flex-start",
    marginLeft: "6%",
    opacity: 1,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: "#757083",
    width: "88%",
    padding: 15,
    alignItems: "center",
    marginBottom: 90,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
  },
});

export default Start;
