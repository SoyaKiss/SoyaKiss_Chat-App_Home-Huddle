import { useRoute, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

const Chat = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userName, bgColor } = route.params || {};
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (userName) {
      navigation.setOptions({ title: userName });
    }
  }, [navigation, userName]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello, how are you?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Louis Heroux",
          Avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "You have entered the chat.",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const fontColor = bgColor === "#B9C6AE" ? "#000000" : "#ced0d2";

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: bgColor }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 50, android: 50 })}
    >
      <View style={styles.welcomeContainer}>
        <Text style={[styles.chatText, { color: fontColor }]}>
          Welcome, {userName}!
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          name: userName,
        }}
        placeholder="Type a message..."
        keyboardShouldPersistTaps="handled"
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  chatText: {
    fontSize: 24,
    color: "#ced0d2",
    fontFamily: "Poppins-Medium",
  },
});

export default Chat;

// test
