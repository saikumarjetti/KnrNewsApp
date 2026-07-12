// src/components/NewsCard.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function NewsCard({
  article,
  onPress,
  isFeaturedLayout = false,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "Date N/A";
    const date = new Date(dateString);
    const options = isFeaturedLayout
      ? { year: "numeric", month: "long", day: "numeric" }
      : { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const categoryForPlaceholder = article.category || "News";
  const placeholderUrl = `https://placehold.co/600x400/E2E8F0/475569?text=${encodeURIComponent(
    categoryForPlaceholder
  )}`;

  let imageSource;
  if (
    article.imageUrl &&
    (article.imageUrl.startsWith("http://") ||
      article.imageUrl.startsWith("https://"))
  ) {
    imageSource = { uri: article.imageUrl };
  } else {
    imageSource = { uri: placeholderUrl };
  }

  return (
    <TouchableOpacity
      style={[
        styles.cardBase,
        isFeaturedLayout ? styles.featuredCard : styles.regularCard,
      ]}
      onPress={() => onPress && article && article.id && onPress(article)}
      activeOpacity={0.7}
    >
      <Image
        source={imageSource} // Now uses online placeholder if article.imageUrl is invalid
        style={isFeaturedLayout ? styles.featuredImage : styles.regularImage}
        onError={(e) => {
          // This is a fallback if the network image (either article.imageUrl or placeholderUrl) fails.
          // For simplicity, we're not setting another source here, but you could log the error.
          console.log(
            "Failed to load image:",
            imageSource.uri,
            e.nativeEvent.error
          );
          // To prevent repeated attempts or show a different UI, you might set a state variable.
        }}
      />
      <View
        style={
          isFeaturedLayout ? styles.featuredContent : styles.regularContent
        }
      >
        <View style={styles.categoryContainer}>
          <MaterialIcons
            name="label"
            size={isFeaturedLayout ? 18 : 16}
            color="#1976D2"
          />
          <Text
            style={[
              styles.categoryText,
              isFeaturedLayout && styles.featuredCategoryText,
            ]}
          >
            {article.category || "General"}
          </Text>
        </View>
        <Text
          style={[
            styles.titleText,
            isFeaturedLayout && styles.featuredTitleText,
          ]}
          numberOfLines={isFeaturedLayout ? 4 : 3}
        >
          {article.title || "No Title Available"}
        </Text>
        <Text
          style={[
            styles.summaryText,
            isFeaturedLayout && styles.featuredSummaryText,
          ]}
          numberOfLines={isFeaturedLayout ? 3 : 2}
        >
          {article.summary ||
            article.content?.substring(0, isFeaturedLayout ? 150 : 100) +
              "..." ||
            "No summary available."}
        </Text>
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <MaterialIcons
              name="access-time"
              size={isFeaturedLayout ? 16 : 14}
              color="#666"
            />
            <Text
              style={[
                styles.dateText,
                isFeaturedLayout && styles.featuredMetaText,
              ]}
            >
              {formatDate(article.publishedDate || article.createdAt)}
            </Text>
          </View>
          {article.author && (
            <Text
              style={[
                styles.authorText,
                isFeaturedLayout && styles.featuredMetaText,
              ]}
              numberOfLines={1}
            >
              By {article.author}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardBase: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    overflow: "hidden",
  },
  regularCard: {},
  featuredCard: {
    marginVertical: 10,
  },
  regularImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    backgroundColor: "#e0e0e0",
  },
  featuredImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    backgroundColor: "#e0e0e0",
  },
  regularContent: {
    padding: 16,
  },
  featuredContent: {
    padding: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: "#1976D2",
    marginLeft: 5,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  featuredCategoryText: {
    fontSize: 14,
  },
  titleText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    lineHeight: 24,
  },
  featuredTitleText: {
    fontSize: 22,
    lineHeight: 30,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
    lineHeight: 21,
  },
  featuredSummaryText: {
    fontSize: 15,
    lineHeight: 23,
    color: "#444",
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  authorText: {
    fontSize: 12,
    color: "#777",
    fontStyle: "italic",
    flexShrink: 1,
  },
  featuredMetaText: {
    fontSize: 13,
  },
});
