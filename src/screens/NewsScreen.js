// src/screens/NewsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import NewsFeed from "../components/NewsFeed";
import { useNavigation } from "@react-navigation/native"; // 1. Import useNavigation

export default function NewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Local",
    "Sports",
    "Politics",
    "Technology",
    "Education",
    "Entertainment",
    // Add more categories if they match your Firestore data categories
  ];

  const navigation = useNavigation(); // 2. Get the navigation object

  // 3. Define the handler for when a news article is pressed
  const handleNavigateToArticle = (article) => {
    navigation.navigate("ArticleDetail", { article: article });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.categoryFilter}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedCategory === category && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === category && styles.filterTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.feedContainer}>
        <NewsFeed
          category={selectedCategory}
          onArticlePress={handleNavigateToArticle} // 4. Pass the handler to NewsFeed
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Consistent background
  },
  categoryFilter: {
    backgroundColor: "#fff", // White background for the filter bar
    paddingVertical: 10,
    paddingHorizontal: 15, // A bit of horizontal padding for the scrollview itself
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 2, // Subtle shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  feedContainer: {
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 18, // Increased padding for better touch area
    paddingVertical: 10, // Increased padding
    marginRight: 10,
    borderRadius: 20, // More rounded
    backgroundColor: "#e9e9e9", // Lighter inactive background
    borderWidth: 1,
    borderColor: "transparent", // No border for inactive
  },
  filterButtonActive: {
    backgroundColor: "#1976D2", // Your brand blue
    borderColor: "#1976D2",
  },
  filterText: {
    fontSize: 14,
    color: "#333", // Darker text for better readability
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
