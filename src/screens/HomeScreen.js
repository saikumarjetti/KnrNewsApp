import React from "react";
import { View, StyleSheet, Image, Text, SafeAreaView } from "react-native";
import LiveStream from "../components/LiveStream";
import NewsFeed from "../components/NewsFeed";
import VideoGallery from "../components/VideoGallery";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://via.placeholder.com/200x60/1976D2/FFFFFF?text=KNR+NEWS",
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Your Trusted News Source</Text>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Live Stream Section */}
        <View style={styles.liveStreamContainer}>
          <LiveStream />
        </View>

        {/* Video Gallery Section */}
        <VideoGallery />

        {/* News Feed Section */}
        <View style={styles.newsFeedContainer}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <NewsFeed />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
  content: {
    flex: 1,
  },
  liveStreamContainer: {
    backgroundColor: "#000",
    marginVertical: 16,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 250,
  },
  newsFeedContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
});
