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

export default function NewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Local",
    "Business",
    "Culture",
    "Education",
    "Sports",
  ];

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
        <NewsFeed category={selectedCategory} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  categoryFilter: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  feedContainer: {
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  filterButtonActive: {
    backgroundColor: "#1976D2",
  },
  filterText: {
    fontSize: 14,
    color: "#666",
  },
  filterTextActive: {
    color: "#fff",
  },
});
