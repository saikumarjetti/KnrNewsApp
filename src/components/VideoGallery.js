// src/components/VideoGallery.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking, // To open YouTube links
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Firebase Web SDK imports
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-web-config"; // Ensure this path is correct

// Helper function to extract YouTube Video ID
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  // Updated regex to be more robust for various YouTube URL formats
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const videosCollectionRef = collection(db, "videoGalleryLinks");
      const q = query(videosCollectionRef, orderBy("addedDate", "desc"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No videos found in videoGalleryLinks.");
        setVideos([]);
      } else {
        const fetchedVideos = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const videoId = getYouTubeVideoId(data.youtubeUrl);
          return {
            id: doc.id,
            title: data.title || "Untitled Video",
            youtubeUrl: data.youtubeUrl,
            thumbnail: videoId
              ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` // medium quality thumbnail
              : "https://placehold.co/150x100/E9EFF3/4A5568?text=No+Thumb", // Fallback placeholder
            duration: data.duration || "", // Assuming duration might be stored
          };
        });
        setVideos(fetchedVideos);
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to load videos. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleVideoPress = (video) => {
    console.log("Video pressed:", video.id, video.youtubeUrl);
    if (video.youtubeUrl) {
      Linking.canOpenURL(video.youtubeUrl).then((supported) => {
        if (supported) {
          Linking.openURL(video.youtubeUrl);
        } else {
          console.log("Don't know how to open URI: " + video.youtubeUrl);
          // Optionally, show an alert to the user
        }
      });
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          styles.loadingStateContainer,
        ]}
      >
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Loading Videos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[styles.container, styles.centered, styles.errorStateContainer]}
      >
        <MaterialIcons name="error-outline" size={40} color="#D32F2F" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchVideos} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (videos.length === 0) {
    return (
      <View
        style={[styles.container, styles.centered, styles.emptyStateContainer]}
      >
        <MaterialIcons name="videocam-off" size={40} color="#757575" />
        <Text style={styles.emptyText}>No videos in the gallery yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {videos.map((video, index) => (
          <TouchableOpacity
            key={video.id}
            style={[styles.videoCard, index === 0 && styles.firstVideoCard]} // Add specific style for the first card if needed for margin
            onPress={() => handleVideoPress(video)}
          >
            <View style={styles.thumbnailContainer}>
              <Image
                source={{ uri: video.thumbnail }}
                style={styles.thumbnail}
              />
              <View style={styles.playButton}>
                <MaterialIcons name="play-arrow" size={30} color="#fff" />
              </View>
              {video.duration && (
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{video.duration}</Text>
                </View>
              )}
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
    // Removed specific background, it will inherit from HomeScreen or have its own if needed
    borderRadius: 12,
    // paddingVertical: 16, // Padding will be handled by content or specific states
    // marginVertical: 8, // These are set by HomeScreen sectionContainer
    // marginHorizontal: 16,
    // elevation: 2, // Shadow applied by HomeScreen's sectionContainer or specific card style
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    minHeight: 180, // Ensure container has some height for loading/error states
    backgroundColor: "#FFFFFF", // Explicitly white for the content area
    paddingTop: 16, // Padding for internal content like title or scrollview
    paddingBottom: 16,
  },
  scrollViewContent: {
    paddingLeft: 16, // Start padding for the first card
    paddingRight: 6, // Space after the last card
  },
  firstVideoCard: {
    // marginLeft: 16, // This is now handled by scrollViewContent paddingLeft
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  loadingStateContainer: {
    paddingVertical: 20,
  },
  errorStateContainer: {
    paddingVertical: 20,
  },
  emptyStateContainer: {
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    marginTop: 12,
    fontSize: 14,
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginTop: 10,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  videoCard: {
    width: 150, // Slightly narrower for better fit if many items
    marginRight: 10, // Spacing between cards
  },
  thumbnailContainer: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
  },
  thumbnail: {
    width: "100%",
    height: 90, // Adjusted height for 150 width (16:9 approx)
    resizeMode: "cover",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }], // Center 40x40 button
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    borderRadius: 20, // Circular
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  durationBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  durationText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  videoTitle: {
    fontSize: 12,
    color: "#333", // Darker for better contrast
    marginTop: 8,
    lineHeight: 16,
    fontWeight: "500",
  },
});
