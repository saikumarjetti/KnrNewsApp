import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const sampleVideos = [
  {
    id: "1",
    title: "Breaking News Update",
    thumbnail: "https://via.placeholder.com/150x100/1976D2/FFFFFF?text=Video+1",
    duration: "5:30",
  },
  {
    id: "2",
    title: "Weather Report",
    thumbnail: "https://via.placeholder.com/150x100/1976D2/FFFFFF?text=Video+2",
    duration: "3:45",
  },
  {
    id: "3",
    title: "Sports Highlights",
    thumbnail: "https://via.placeholder.com/150x100/1976D2/FFFFFF?text=Video+3",
    duration: "7:20",
  },
];

export default function VideoGallery() {
  const handleVideoPress = (video) => {
    console.log("Video pressed:", video.id);
    // Handle video playback
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Video Gallery</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sampleVideos.map((video) => (
          <TouchableOpacity
            key={video.id}
            style={styles.videoCard}
            onPress={() => handleVideoPress(video)}
          >
            <View style={styles.thumbnailContainer}>
              <Image
                source={{ uri: video.thumbnail }}
                style={styles.thumbnail}
              />
              <View style={styles.playButton}>
                <MaterialIcons name="play-arrow" size={24} color="#fff" />
              </View>
              <View style={styles.duration}>
                <Text style={styles.durationText}>{video.duration}</Text>
              </View>
            </View>
            <Text style={styles.videoTitle} numberOfLines={2}>
              {video.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  videoCard: {
    width: 150,
    marginRight: 12,
  },
  thumbnailContainer: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbnail: {
    width: 150,
    height: 100,
    resizeMode: "cover",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12 }, { translateY: -12 }],
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  duration: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  durationText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  videoTitle: {
    fontSize: 12,
    color: "#333",
    marginTop: 8,
    lineHeight: 16,
  },
});
