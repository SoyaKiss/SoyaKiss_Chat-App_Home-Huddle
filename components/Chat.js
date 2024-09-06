import { useRoute, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import MapView from "react-native-maps";

const Chat = ({ db, isConnected, storage }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userName, userID, bgColor } = route.params || {};
  const [messages, setMessages] = useState([]);

  const clearMessages = async () => {
    try {
      await AsyncStorage.removeItem("cachedMessages");
      console.log("Messages cleared from storage");
    } catch (error) {
      console.error("Error clearing messages: ", error);
    }
  };

  useEffect(() => {
    // Clear messages when the component unmounts
    return () => {
      clearMessages(); // This will clear the cached messages when the component is unmounted
    };
  }, []);

  // Set navigation title to user's name
  useEffect(() => {
    if (userName) {
      navigation.setOptions({ title: userName });
    }
  }, [navigation, userName]);

  // Handle fetching and caching messages based on connection status
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));

    if (isConnected) {
      // Online: Fetch messages from Firestore and cache them
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

          // Cache messages locally
          AsyncStorage.setItem(
            "cachedMessages",
            JSON.stringify(fetchedMessages)
          )
            .then(() => {
              console.log("Messages cached locally");
            })
            .catch((error) => {
              console.error("Error caching messages: ", error);
            });
        },
        (error) => {
          console.error("Error fetching messages: ", error); // Log any errors that occur during fetching
        }
      );

      // Cleanup the listener on component unmount
      return () => unsubscribe();
    } else {
      // Offline: Load cached messages from local storage
      AsyncStorage.getItem("cachedMessages")
        .then((cachedMessages) => {
          if (cachedMessages) {
            setMessages(JSON.parse(cachedMessages));
          } else {
            console.log("No cached messages found");
          }
        })
        .catch((error) => {
          console.error("Error loading cached messages: ", error);
        });
    }
  }, [db, isConnected]);

  // Function to handle sending messages
  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    newMessages.forEach((message) => {
      addDoc(collection(db, "messages"), message);
    });
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

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} onSend={onSend} {...props} />;
  };

  return (
    <ActionSheetProvider>
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
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          user={{
            _id: userID,
            name: userName,
          }}
          placeholder="Type a message..."
          keyboardShouldPersistTaps="handled"
          bottomOffset={Platform.OS === "ios" ? 50 : 0}
          renderInputToolbar={(props) => <InputToolbar {...props} />}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </SafeAreaView>
    </ActionSheetProvider>
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
