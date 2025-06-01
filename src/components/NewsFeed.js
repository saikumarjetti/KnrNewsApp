import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import NewsCard from "./NewsCard";

// Sample news data (replace with actual API call)
const sampleNews = [
  {
    id: "1",
    title: "Local Community Event Draws Large Crowd",
    category: "Local",
    summary:
      "A recent community event in the city center attracted hundreds of participants, showcasing local talent and cultural diversity.",
    imageUrl:
      "https://via.placeholder.com/400x200/1976D2/FFFFFF?text=Local+Event",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "New Development Project Announced",
    category: "Business",
    summary:
      "City officials have announced a major development project that aims to revitalize the downtown area.",
    imageUrl:
      "https://via.placeholder.com/400x200/1976D2/FFFFFF?text=Development",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Cultural Festival Celebrates Diversity",
    category: "Culture",
    summary:
      "The annual cultural festival brought together people from various backgrounds to celebrate diversity and tradition.",
    imageUrl: "https://via.placeholder.com/400x200/1976D2/FFFFFF?text=Festival",
    publishedAt: new Date().toISOString(),
  },
];

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadNews = async () => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch('your-api-endpoint');
      // const data = await response.json();
      setNews(sampleNews);
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadNews();
  };

  const handleNewsPress = (article) => {
    // Handle navigation to article detail
    console.log("Article pressed:", article.id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <FlatList
      data={news}
      renderItem={({ item }) => (
        <NewsCard article={item} onPress={handleNewsPress} />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
