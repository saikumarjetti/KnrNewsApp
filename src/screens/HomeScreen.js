// src/screens/HomeScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import LiveStream from "../components/LiveStream";
import NewsFeed from "../components/NewsFeed";
import VideoGallery from "../components/VideoGallery";
import NewsCard from "../components/NewsCard";
import SocialMediaLinks from "../components/SocialMediaLinks";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../firebase-web-config";

// const { width } = Dimensions.get("window"); // Not currently used here, can be removed if not needed

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState(null);

  const fetchFeaturedArticle = useCallback(async () => {
    setLoadingFeatured(true);
    setErrorFeatured(null);
    try {
      const articlesCollectionRef = collection(db, "newsArticles");
      const q = query(
        articlesCollectionRef,
        where("isFeatured", "==", true),
        orderBy("publishedDate", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        const article = {
          id: querySnapshot.docs[0].id,
          ...docData,
          publishedDate: docData.publishedDate?.toDate
            ? docData.publishedDate.toDate().toISOString()
            : docData.publishedDate || new Date().toISOString(),
          imageUrl:
            docData.imageObjects && docData.imageObjects.length > 0
              ? docData.imageObjects[0].url
              : docData.imageUrls && docData.imageUrls.length > 0
              ? docData.imageUrls[0]
              : docData.imageUrl || null,
        };
        setFeaturedArticle(article);
      } else {
        setFeaturedArticle(null);
      }
    } catch (err) {
      console.error("Error fetching featured article:", err);
      setErrorFeatured("Failed to load featured article.");
    } finally {
      setLoadingFeatured(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedArticle();
  }, [fetchFeaturedArticle]);

  const handleNavigateToArticle = (article) => {
    if (article && article.id) {
      navigation.navigate("ArticleDetail", { article: article });
    } else {
      console.warn("Attempted to navigate with invalid article data", article);
    }
  };

  const ListHeader = () => (
    <View style={styles.listHeaderContainer}>
      {loadingFeatured && (
        <View style={styles.featuredLoadingContainer}>
          <ActivityIndicator size="large" color="#1976D2" />
        </View>
      )}
      {errorFeatured && !loadingFeatured && (
        <View style={styles.featuredErrorContainer}>
          <Text style={styles.errorText}>{errorFeatured}</Text>
          <TouchableOpacity
            onPress={fetchFeaturedArticle}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      {featuredArticle && !loadingFeatured && !errorFeatured && (
        <View style={styles.featuredArticleWrapper}>
          <Text style={styles.mainSectionTitle}>Featured News</Text>
          <NewsCard
            article={featuredArticle}
            onPress={() => handleNavigateToArticle(featuredArticle)}
            isFeaturedLayout={true}
          />
        </View>
      )}

      <View>
        <Text style={styles.mainSectionTitle}>Live Stream</Text>
        <View style={styles.liveStreamCard}>
          <LiveStream />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.mainSectionTitle}>Video Gallery</Text>
        <VideoGallery />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.mainSectionTitle}>Follow Us</Text>
        <SocialMediaLinks />
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.mainSectionTitle}>Latest News</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Modified Header View */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/LOGO.jpeg")} // Ensure this path is correct
          style={styles.mainLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerCaption}>
          KNR Channel: Your Trusted Update
        </Text>
      </View>
      <NewsFeed
        ListHeaderComponent={ListHeader}
        onArticlePress={handleNavigateToArticle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1976D2",
  },
  header: {
    backgroundColor: "#1976D2",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row", // Aligns children (logo and caption) in a row
    alignItems: "center", // Vertically aligns items in the center of the row
    borderBottomWidth: 1,
    borderBottomColor: "#155dfc",
  },
  mainLogo: {
    width: 170, // Adjusted width to make space for caption. Change as needed.
    height: 50, // Adjusted height. Change as needed.
    marginRight: 10, // Adds some space between the logo and the caption
  },
  headerCaption: {
    fontSize: 16, // Example font size
    fontWeight: "600", // Example font weight
    color: "#ffffff", // Example color
    flexShrink: 1, // Allows text to shrink if needed, add flex:1 if it should expand
  },
  listHeaderContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  featuredArticleWrapper: {
    marginBottom: 24,
  },
  featuredLoadingContainer: {
    height: 280,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  featuredErrorContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF0F0",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FFDADA",
  },
  errorText: {
    fontSize: 15,
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  mainSectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A202C",
    marginBottom: 12,
  },
  liveStreamCard: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 220,
    backgroundColor: "#000000",
    // padding: -10,
  },
});
