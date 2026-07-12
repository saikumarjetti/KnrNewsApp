// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
// Import StatusBar from react-native for currentHeight, and Platform
import {
  StatusBar as ReactNativeStatusBar,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
// Import StatusBar from expo-status-bar for styling
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

// Import screens
import HomeScreen from "./src/screens/HomeScreen";
import NewsScreen from "./src/screens/NewsScreen";
import LiveScreen from "./src/screens/LiveScreen";
import ArticleDetailScreen from "./src/screens/ArticleDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for the "Home" tab
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Stack headers are off
      }}
    >
      <Stack.Screen name="HomeStackScreen" component={HomeScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
}

// Stack Navigator for the "News" tab
function NewsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // Stack headers are off
      }}
    >
      <Stack.Screen name="NewsStackScreen" component={NewsScreen} />
      <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    // Wrap the entire app content with SafeAreaView
    // This helps respect system UI like the status bar on Android and notches on iOS.
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* ExpoStatusBar component configures the appearance of the system status bar */}
      {/* Changed backgroundColor to a "blue-600" equivalent */}
      <ExpoStatusBar style="auto" backgroundColor="#2563EB" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "HomeTab") {
                iconName = "home";
              } else if (route.name === "NewsTab") {
                iconName = "article";
              } else if (route.name === "LiveTab") {
                iconName = "live-tv";
              }
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            },
            tabBarActiveTintColor: "#1976D2", // This is the active tab icon color, you might want to match it with #2563EB
            tabBarInactiveTintColor: "gray",
          })}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeStack}
            options={{
              title: "KNR Channel",
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="NewsTab"
            component={NewsStack}
            options={{
              title: "Latest News",
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="LiveTab"
            component={LiveScreen}
            options={{
              title: "Live TV",
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#1976D2", // Example: matches HomeScreen's typical background
    // For Android, explicitly add padding to account for the status bar height.
    paddingTop:
      Platform.OS === "android" ? ReactNativeStatusBar.currentHeight : 0,
  },
});
