import { useRoute, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

const Chat = ({ db }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userName, userID, bgColor } = route.params || {};
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (userName) {
      navigation.setOptions({ title: userName });
    }
  }, [navigation, userName]);

  useEffect(() => {
    const messagesRef = collection(db, "messages");

    const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            _id: doc.id,
            ...data,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          };
        });

        setMessages(fetchedMessages);
      },
      (error) => {
        console.error("Error fetching messages: ", error); // Log any errors that occur during fetching
      }
    );

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [db]);

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

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
    <SafeAreaView
      style={[styles.container, { backgroundColor: bgColor }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 75, android: 50 })}
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
          _id: userID,
          name: userName,
        }}
        placeholder="Type a message..."
        keyboardShouldPersistTaps="handled"
        bottomOffset={Platform.OS === "ios" ? 50 : 0}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </SafeAreaView>
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
