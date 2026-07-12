// src/screens/LiveScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import LiveStream from "../components/LiveStream";

// Firebase Web SDK imports
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-web-config"; // Ensure this path is correct

export default function LiveScreen() {
  const [programs, setPrograms] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [errorSchedule, setErrorSchedule] = useState(null);

  const fetchSchedule = useCallback(async () => {
    setLoadingSchedule(true);
    setErrorSchedule(null);
    try {
      // Assuming a collection named 'programSchedules'
      // And documents have 'title', 'time', 'duration', and 'startTime' (e.g., '09:00' for sorting) or 'sortOrder'
      const scheduleCollectionRef = collection(db, "programSchedules");
      const q = query(scheduleCollectionRef, orderBy("startTime", "asc")); // Or orderBy('sortOrder', 'asc')

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No program schedule found in Firestore.");
        setPrograms([]);
      } else {
        const fetchedSchedule = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPrograms(fetchedSchedule);
      }
    } catch (err) {
      console.error("Error fetching program schedule:", err);
      setErrorSchedule("Failed to load today's schedule.");
    } finally {
      setLoadingSchedule(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  const renderSchedule = () => {
    if (loadingSchedule) {
      return (
        <View style={styles.centeredMessage}>
          <ActivityIndicator size="small" color="#1976D2" />
          <Text style={styles.loadingText}>Loading Schedule...</Text>
        </View>
      );
    }
    if (errorSchedule) {
      return (
        <View style={styles.centeredMessage}>
          <MaterialIcons name="error-outline" size={24} color="#D32F2F" />
          <Text style={styles.errorTextSmall}>{errorSchedule}</Text>
        </View>
      );
    }
    if (programs.length === 0) {
      return (
        <View style={styles.centeredMessage}>
          <MaterialIcons name="event-busy" size={24} color="#757575" />
          <Text style={styles.emptyScheduleText}>
            Program schedule is not available at the moment.
          </Text>
        </View>
      );
    }
    return programs.map((program) => (
      <View key={program.id} style={styles.programItem}>
        <MaterialIcons name="schedule" size={24} color="#1976D2" />
        <View style={styles.programInfo}>
          <Text style={styles.programTitle}>{program.title || "N/A"}</Text>
          <View style={styles.programDetails}>
            <Text style={styles.programTime}>{program.time || "N/A"}</Text>
            {program.duration && ( // Only show duration if it exists
              <Text style={styles.programDuration}>({program.duration})</Text>
            )}
          </View>
        </View>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.streamContainer}>
        <LiveStream />
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.title}>KNR Channel Live</Text>
        <Text style={styles.description}>
          Watch our 24/7 live news coverage bringing you the latest updates and
          breaking news.
        </Text>
      </View>

      <View style={styles.scheduleSection}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        {renderSchedule()}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Stream Information</Text>
        <View style={styles.infoItem}>
          <MaterialIcons name="info-outline" size={20} color="#555" />
          <Text style={styles.infoText}>
            Stream quality adjusts automatically based on your connection.
          </Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="wifi" size={20} color="#555" />
          <Text style={styles.infoText}>
            A stable internet connection is recommended for the best experience.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Slightly different background for variety
  },
  streamContainer: {
    backgroundColor: "#000",
    position: "relative",
    height: 250, // You might want to make this responsive
    marginBottom: 16, // Space after stream
  },
  liveIndicator: {
    position: "absolute",
    top: 12, // Adjusted position
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(204, 0, 0, 0.85)", // Slightly darker red
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#fff",
    marginRight: 6,
  },
  liveText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  infoSection: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 12, // Slightly reduced horizontal margin for a wider content feel
    marginBottom: 16, // Consistent bottom margin
    borderRadius: 8, // Softer corners
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  title: {
    fontSize: 22, // Slightly larger
    fontWeight: "700", // Bolder
    color: "#2c3e50", // Darker blue-gray
    marginBottom: 8,
  },
  description: {
    fontSize: 15, // Slightly larger
    color: "#555",
    lineHeight: 22,
  },
  scheduleSection: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 12,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 19, // Consistent section title size
    fontWeight: "600",
    color: "#34495e", // Another shade of blue-gray
    marginBottom: 16,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  programItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14, // Increased padding
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0", // Lighter separator
  },
  programInfo: {
    marginLeft: 16,
    flex: 1,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 5,
  },
  programDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  programTime: {
    fontSize: 14,
    color: "#1976D2", // Make time stand out
    fontWeight: "500",
    marginRight: 8,
  },
  programDuration: {
    fontSize: 13,
    color: "#777",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8, // Added padding
  },
  infoText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#444", // Slightly darker
    flex: 1,
    lineHeight: 20,
  },
  centeredMessage: {
    // For loading/error/empty schedule states
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
  errorTextSmall: {
    marginTop: 8,
    fontSize: 14,
    color: "#D32F2F",
  },
  emptyScheduleText: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});
