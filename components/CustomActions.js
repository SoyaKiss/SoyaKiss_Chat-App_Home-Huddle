import React from "react";
import { TouchableOpacity, StyleSheet, View, Text, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        try {
          const uploadUrl = await uploadImage(result.assets[0].uri);
          onSend([
            {
              _id: Math.random().toString(36).substring(7),
              createdAt: new Date(),
              image: uploadUrl, // Use the URL from Firebase Storage
              user: {
                _id: 1,
                name: "User",
              },
            },
          ]);
        } catch (error) {
          Alert.alert("Error uploading image", error.message);
        }
      } else {
        Alert.alert("Permissions haven't been granted.");
      }
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        try {
          const uploadUrl = await uploadImage(result.assets[0].uri);
          onSend([
            {
              _id: Math.random().toString(36).substring(7),
              createdAt: new Date(),
              image: uploadUrl, // Use the URL from Firebase Storage
              user: {
                _id: 1,
                name: "User",
              },
            },
          ]);
        } catch (error) {
          Alert.alert("Error uploading image", error.message);
        }
      } else {
        Alert.alert("Permissions haven't been granted.");
      }
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      // Verify the storage object is initialized correctly
      if (!storage) {
        throw new Error("Firebase storage is not initialized properly.");
      }

      // Create a reference in Firebase Storage
      const storageRef = ref(
        storage,
        `images/${Date.now()}_${Math.random()}.jpg`
      );

      // Upload the file
      await uploadBytes(storageRef, blob);

      // Get download URL
      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL; // Return the download URL to be used in the chat
    } catch (error) {
      Alert.alert("Error uploading image", error.message);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        // Create a message object with the location data
        const message = {
          _id: Math.random().toString(),
          text: "Here is my location",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "User",
          },
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        };

        // Send the formatted message
        onSend([message]);
      } else {
        Alert.alert("Error occurred while fetching location");
      }
    } else {
      Alert.alert("Permissions haven't been granted.");
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onActionPress}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;
