import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity, // Added for a "Load More" button
} from "react-native";
import NewsCard from "./NewsCard"; // Make sure this path is correct

// Firebase Web SDK imports for Firestore
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  startAfter, // Import for pagination
} from "firebase/firestore";
// Import your initialized Firestore instance from your web config file
import { db } from "../firebase-web-config"; // 👈 Ensure this path is correct
import { useNavigation } from "@react-navigation/native";
export default function NewsFeed({
  ListHeaderComponent,
  category = "All",
  onArticlePress, // Callback to handle article press for navigation
}) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [lastDoc, setLastDoc] = useState(null); // For pagination
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To know if there are more articles to load
  const navigation = useNavigation();
  const ARTICLES_PER_PAGE = 10;
  const handleNavigateToArticle = (article) => {
    navigation.navigate("ArticleDetail", { article }); // 'ArticleDetail' is the name you give to the screen in your navigator
  };
  const loadNews = useCallback(
    async (isRefreshing = false, loadMore = false) => {
      if (!isRefreshing && !loadMore) {
        setLoading(true);
        setNews([]); // Clear news on initial load or category change
        setLastDoc(null); // Reset pagination
        setHasMore(true); // Assume there's more initially
      }
      if (loadMore && !hasMore) {
        setLoadingMore(false);
        return; // No more articles to load
      }
      if (loadMore) {
        setLoadingMore(true);
      }
      setError(null);

      try {
        console.log(
          `Fetching news from Firestore (Web SDK). Category: ${category}, Refreshing: ${isRefreshing}, Loading More: ${loadMore}`
        );
        const newsCollectionRef = collection(db, "newsArticles");
        let articlesQuery = query(
          newsCollectionRef,
          orderBy("publishedDate", "desc")
        );

        if (category && category !== "All") {
          articlesQuery = query(
            articlesQuery,
            where("category", "==", category)
          );
        }

        if (loadMore && lastDoc) {
          articlesQuery = query(
            articlesQuery,
            startAfter(lastDoc),
            limit(ARTICLES_PER_PAGE)
          );
        } else {
          articlesQuery = query(articlesQuery, limit(ARTICLES_PER_PAGE));
        }

        const querySnapshot = await getDocs(articlesQuery);

        if (querySnapshot.empty) {
          console.log("No (more) news articles found in Firestore.");
          if (!loadMore) {
            setNews([]);
          }
          setHasMore(false); // No more articles
        } else {
          const fetchedNews = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              publishedDate: data.publishedDate?.toDate
                ? data.publishedDate.toDate().toISOString() // Convert to ISO string for consistency
                : data.publishedDate || new Date().toISOString(),
              imageUrl:
                data.imageObjects && data.imageObjects.length > 0
                  ? data.imageObjects[0].url
                  : data.imageUrls && data.imageUrls.length > 0
                  ? data.imageUrls[0]
                  : data.imageUrl || null,
            };
          });

          if (loadMore) {
            setNews((prevNews) => [...prevNews, ...fetchedNews]);
          } else {
            setNews(fetchedNews);
          }

          if (querySnapshot.docs.length < ARTICLES_PER_PAGE) {
            setHasMore(false); // Less than a full page means no more
          } else {
            setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
            setHasMore(true);
          }

          console.log(
            `Fetched ${fetchedNews.length} articles. Category: ${category}. Has More: ${hasMore}`
          );
        }
      } catch (err) {
        console.error("Error loading news from Firestore (Web SDK):", err);
        setError("Failed to load news articles. Please try again.");
      } finally {
        if (!isRefreshing && !loadMore) {
          setLoading(false);
        }
        if (loadMore) {
          setLoadingMore(false);
        }
        setRefreshing(false);
      }
    },
    [category, lastDoc, hasMore] // Include hasMore
  );

  useEffect(() => {
    // This effect will run when the category changes
    loadNews();
  }, [category]); // Only re-run when category changes

  const onRefresh = () => {
    setRefreshing(true);
    setLastDoc(null); // Reset pagination on refresh
    setHasMore(true);
    loadNews(true);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      loadNews(false, true);
    }
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    if (!hasMore && news.length > 0 && !loadingMore) {
      // Show "No more articles" only if not loading and hasMore is false
      return (
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>No more articles</Text>
        </View>
      );
    }
    if (loadingMore) {
      return (
        <View style={styles.footerLoaderContainer}>
          <ActivityIndicator size="small" color="#1976D2" />
        </View>
      );
    }
    return null;
  };

  if (loading && !refreshing && news.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1976D2" />
        <Text style={styles.loadingText}>Loading News...</Text>
      </View>
    );
  }

  if (error && news.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={onRefresh} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Tap to Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!loading && news.length === 0 && !error) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No news articles found for{" "}
          {category === "All" ? "this category" : category}.
        </Text>
        <Text style={styles.emptyTextSmall}>
          Please check back later or pull down to refresh.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={news}
      renderItem={({ item }) => (
        <NewsCard
          article={item}
          onPress={() => onArticlePress && onArticlePress(item)}
        />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#1976D2"]}
          tintColor={"#1976D2"}
        />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5} // Load more when half a screen away from the end
      ListFooterComponent={renderFooter}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#f0f0f0", // Slightly off-white background for the list area
  },
  contentContainer: {
    paddingVertical: 8,
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 16,
    backgroundColor: "#fff", // Give it a card-like feel
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  errorText: {
    fontSize: 17,
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 15,
  },
  retryButton: {
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    minHeight: 200, // Ensure it takes some space
    backgroundColor: "#f5f5f5",
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyTextSmall: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  footerLoaderContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  footerTextContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#777",
  },
});
