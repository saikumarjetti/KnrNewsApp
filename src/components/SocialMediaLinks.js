// src/components/SocialMediaLinks.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // For a title icon, optional

// Define your social media links here
const socialLinksData = [
  {
    name: "Facebook",
    url: "https://facebook.com/knrnews.in", // Your actual Facebook URL
    // Ensure you have these images in your assets folder
    // For example: assets/icons/facebook.png
    icon: require("../../assets/facebook.png"), // Adjust path as needed
  },
  {
    name: "Twitter", // Or "X"
    url: "https://x.com/knrnews", // Your actual X/Twitter URL
    icon: require("../../assets/twitter.png"), // Adjust path
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@knrnewsTelugu", // Your actual YouTube URL
    icon: require("../../assets/youtube.png"), // Adjust path
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/knrnewstelugu/", // Your actual Instagram URL
    icon: require("../../assets/instagram.png"), // Adjust path
  },
  // Add more links as needed
];

export default function SocialMediaLinks() {
  const handleLinkPress = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", `Sorry, cannot open this URL: ${url}`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title is now provided by HomeScreen, so this internal title is optional */}
      {/* <View style={styles.titleContainer}>
        <MaterialIcons name="group-work" size={22} color="#1A202C" />
        <Text style={styles.title}>Follow Us</Text>
      </View> */}
      <View style={styles.linksRow}>
        {socialLinksData.map((link) => (
          <TouchableOpacity
            key={link.name}
            style={styles.linkButton}
            onPress={() => handleLinkPress(link.url)}
            activeOpacity={0.7}
          >
            <Image source={link.icon} style={styles.icon} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12, // Padding for the content inside the card
    // marginVertical: 8, // Set by HomeScreen's sectionContainer
    // marginHorizontal: 16, // Set by HomeScreen
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  titleContainer: {
    // Optional, if you want a title within this component
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4, // Align with linksRow if it has items
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A202C",
    marginLeft: 8,
  },
  linksRow: {
    flexDirection: "row",
    justifyContent: "space-around", // Distribute icons evenly
    alignItems: "center",
    flexWrap: "wrap", // Allow wrapping if many icons
  },
  linkButton: {
    padding: 10, // Make touch target larger
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8, // Spacing between buttons
    marginVertical: 5,
    borderRadius: 8, // Optional: if you want a background effect on press
    // backgroundColor: '#f0f0f0', // Optional: subtle background for button
  },
  icon: {
    width: 32, // Adjust size as needed
    height: 32,
    resizeMode: "contain",
  },
});
