import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import backgroundImage from "../assets/Background Image.png";

const Start = ({ navigation }) => {
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("");

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <Text style={styles.appTitle}>Home Huddle</Text>

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

          <View style={styles.colorOptions}>
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: "#090C08" }]}
              onPress={() => setBgColor("#090C08")}
            />
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: "#474056" }]}
              onPress={() => setBgColor("#474056")}
            />
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: "#8A95A5" }]}
              onPress={() => setBgColor("#8A95A5")}
            />
            <TouchableOpacity
              style={[styles.colorCircle, { backgroundColor: "#B9C6AE" }]}
              onPress={() => setBgColor("#B9C6AE")}
            />
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() =>
              navigation.navigate("Chat", { userName: text, bgColor })
            }
          >
            <Text style={styles.startButtonText}>Start Chatting!</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    position: "absolute",
    bottom: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    height: "44%",
    width: "88%",
  },
  textInput: {
    // inner text styles
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    position: "absolute",
    fontFamily: "Poppins-Medium",
    opacity: 0.5,
    // Outer box styles
    top: 25,
    width: "88%",
    height: 60,
    borderWidth: 2,
    borderColor: "#757083",
    padding: 10,
    marginBottom: 30,
    borderRadius: 2,
  },
  colorOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "88%",
    marginBottom: 80,
  },
  chooseBackgroundColor: {
    fontSize: 16,
    fontWeight: "300",
    fontFamily: "Poppins-SemiBold",
    color: "#757083",
    marginBottom: 20,
    marginTop: 150,
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
    marginBottom: 55,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-Regular",
  },
});

export default Start;
