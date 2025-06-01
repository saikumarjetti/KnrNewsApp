import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import LiveStream from "../components/LiveStream";

export default function LiveScreen() {
  const programs = [
    {
      id: "1",
      title: "Morning News Bulletin",
      time: "09:00 AM",
      duration: "30 min",
    },
    {
      id: "2",
      title: "Local News Update",
      time: "12:00 PM",
      duration: "45 min",
    },
    {
      id: "3",
      title: "Evening Prime Time",
      time: "07:00 PM",
      duration: "60 min",
    },
    {
      id: "4",
      title: "Night News Roundup",
      time: "10:00 PM",
      duration: "30 min",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Live Stream Section */}
      <View style={styles.streamContainer}>
        <LiveStream />
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {/* Stream Info */}
      <View style={styles.infoSection}>
        <Text style={styles.title}>KNR News Live</Text>
        <Text style={styles.description}>
          Watch our 24/7 live news coverage bringing you the latest updates and
          breaking news.
        </Text>
      </View>

      {/* Program Schedule */}
      <View style={styles.scheduleSection}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        {programs.map((program) => (
          <View key={program.id} style={styles.programItem}>
            <MaterialIcons name="schedule" size={24} color="#1976D2" />
            <View style={styles.programInfo}>
              <Text style={styles.programTitle}>{program.title}</Text>
              <View style={styles.programDetails}>
                <Text style={styles.programTime}>{program.time}</Text>
                <Text style={styles.programDuration}>{program.duration}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Stream Information */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Stream Information</Text>
        <View style={styles.infoItem}>
          <MaterialIcons name="info" size={20} color="#666" />
          <Text style={styles.infoText}>
            Stream quality adjusts automatically based on your connection
          </Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialIcons name="wifi" size={20} color="#666" />
          <Text style={styles.infoText}>
            Stable internet connection recommended for HD streaming
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  streamContainer: {
    backgroundColor: "#000",
    position: "relative",
    height: 250,
  },
  liveIndicator: {
    position: "absolute",
    top: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(220, 53, 69, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginRight: 6,
  },
  liveText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoSection: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  scheduleSection: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  programItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  programInfo: {
    marginLeft: 16,
    flex: 1,
  },
  programTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  programDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  programTime: {
    fontSize: 14,
    color: "#666",
    marginRight: 12,
  },
  programDuration: {
    fontSize: 14,
    color: "#999",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
});
