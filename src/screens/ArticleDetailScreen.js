// src/screens/ArticleDetailScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Assuming you use Expo and have this installed

const { width } = Dimensions.get("window");

export default function ArticleDetailScreen({ route, navigation }) {
  // The article object is expected to be passed as a route parameter
  if (!route.params || !route.params.article) {
    // Fallback if article data is missing
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color="#1976D2"
              style={{ marginLeft: Platform.OS === "ios" ? 8 : 0 }}
            />
          </TouchableOpacity>
          <Text
            style={styles.headerTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Error
          </Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.centeredMessageContainer}>
          <Text style={styles.errorText}>Article data not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { article } = route.params;

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  let displayImageUrl = null;
  if (
    article.imageObjects &&
    article.imageObjects.length > 0 &&
    article.imageObjects[0].url
  ) {
    displayImageUrl = article.imageObjects[0].url;
  } else if (
    article.imageUrls &&
    article.imageUrls.length > 0 &&
    article.imageUrls[0]
  ) {
    displayImageUrl = article.imageUrls[0];
  } else if (
    article.imageUrl &&
    (article.imageUrl.startsWith("http://") ||
      article.imageUrl.startsWith("https://"))
  ) {
    displayImageUrl = article.imageUrl;
  }

  const imageCredit =
    article.imageObjects &&
    article.imageObjects.length > 0 &&
    article.imageObjects[0].credit
      ? article.imageObjects[0].credit
      : null;

  const placeholderUrl = `https://placehold.co/600x400/E9EFF3/4A5568?text=${encodeURIComponent(
    article.category
  )}`;
  const imageSource = displayImageUrl
    ? { uri: displayImageUrl }
    : { uri: placeholderUrl };

  const renderContent = (contentString) => {
    if (!contentString || String(contentString).trim() === "") {
      return <Text style={styles.paragraph}>Content not available.</Text>;
    }
    // Ensure contentString is treated as a string before split
    return String(contentString)
      .split(/\\n\\n|\n\n/) // Split by double newlines (escaped or not)
      .map((paragraph, index) => {
        const trimmedParagraph = paragraph.trim().replace(/\\n/g, "\n");
        if (trimmedParagraph === "") {
          return null; // Avoid rendering empty Text tags
        }
        return (
          <Text key={index} style={styles.paragraph}>
            {trimmedParagraph}
          </Text>
        );
      })
      .filter(Boolean); // Remove any nulls from the array, so only valid <Text> components are rendered
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color="#1976D2"
            style={{ marginLeft: Platform.OS === "ios" ? 8 : 0 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {article.category || "Article"}
        </Text>
        <View style={{ width: 40 }} />
        {/* Spacer to help balance the back button for centering title */}
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          {article.title || "No Title Available"}
        </Text>

        <View style={styles.metaContainer}>
          {article.author && (
            <View style={styles.metaItem}>
              <MaterialIcons name="person-outline" size={16} color="#555" />
              <Text style={styles.metaText}>{article.author}</Text>
            </View>
          )}
          <View style={styles.metaItem}>
            <MaterialIcons name="access-time" size={16} color="#555" />
            <Text style={styles.metaText}>
              {formatDate(article.publishedDate)}
            </Text>
          </View>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={imageSource} style={styles.image} resizeMode="cover" />
          {imageCredit && (
            <Text style={styles.imageCredit}>Credit: {imageCredit}</Text>
          )}
        </View>

        {article.summary && ( // Only render summary if it exists
          <Text style={styles.summary}>{article.summary}</Text>
        )}

        <View style={styles.contentBody}>{renderContent(article.content)}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Platform.OS === "ios" ? 10 : 12,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1C1C1E",
    textAlign: "center",
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: Platform.OS === "ios" ? 28 : 26,
    fontWeight: "bold",
    color: "#1A202C",
    marginBottom: 16, // Increased margin
    lineHeight: Platform.OS === "ios" ? 38 : 36, // Increased line height
  },
  metaContainer: {
    flexDirection: "column",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Increased spacing
  },
  metaText: {
    fontSize: 14, // Slightly larger meta text
    color: "#4A5568",
    marginLeft: 8,
    lineHeight: 20,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#F0F2F5",
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  imageCredit: {
    fontSize: 11,
    color: "#718096",
    fontStyle: "italic",
    textAlign: "right",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "rgba(240, 242, 245, 0.85)", // Slightly more opaque
  },
  summary: {
    fontSize: 17,
    fontStyle: "italic",
    color: "#2D3748",
    lineHeight: 26,
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  contentBody: {
    // Body content styling is handled by paragraph style
  },
  paragraph: {
    fontSize: Platform.OS === "ios" ? 17 : 16,
    lineHeight: Platform.OS === "ios" ? 29 : 27, // Adjusted for readability
    color: "#333333", // Standard dark gray for body
    marginBottom: 20,
    textAlign: Platform.OS === "android" ? "justify" : "left",
  },
  // For fallback message if article data is missing
  centeredMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
  },
});
