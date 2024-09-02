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

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.chatText}>Welcome, {userName}!</Text>
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
    color: "white",
  },
});

export default Chat;
