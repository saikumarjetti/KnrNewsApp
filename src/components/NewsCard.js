import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function NewsCard({ article, onPress }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress && onPress(article)}
    >
      {article.imageUrl && (
        <Image source={{ uri: article.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <View style={styles.categoryContainer}>
          <MaterialIcons name="label" size={16} color="#1976D2" />
          <Text style={styles.category}>{article.category || "General"}</Text>
        </View>
        <Text style={styles.title} numberOfLines={3}>
          {article.title}
        </Text>
        <Text style={styles.summary} numberOfLines={2}>
          {article.summary || article.content?.substring(0, 100) + "..."}
        </Text>
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <MaterialIcons name="access-time" size={14} color="#666" />
            <Text style={styles.date}>
              {formatDate(article.publishedAt || article.createdAt)}
            </Text>
          </View>
          {article.author && (
            <Text style={styles.author}>By {article.author}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  category: {
    fontSize: 12,
    color: "#1976D2",
    marginLeft: 4,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    lineHeight: 24,
  },
  summary: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  author: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
});
