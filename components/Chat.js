import { useRoute, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

const Chat = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userName, bgColor } = route.params || {};

  useEffect(() => {
    if (userName) {
      navigation.setOptions({ title: userName });
    }
  }, [navigation, userName]);

  const fontColor = bgColor === "#B9C6AE" ? "#000000" : "#ced0d2";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.chatText, { color: fontColor }]}>
        Welcome, {userName}!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatText: {
    fontSize: 24,
    color: "#ced0d2",
    fontFamily: "Poppins-Medium",
  },
});

export default Chat;
