import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

// Import screens
import HomeScreen from "./src/screens/HomeScreen";
import NewsScreen from "./src/screens/NewsScreen";
import LiveScreen from "./src/screens/LiveScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1976D2" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "News") {
              iconName = "article";
            } else if (route.name === "Live") {
              iconName = "live-tv";
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#1976D2",
          tabBarInactiveTintColor: "gray",
          headerStyle: {
            backgroundColor: "#1976D2",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "KNR News" }}
        />
        <Tab.Screen
          name="News"
          component={NewsScreen}
          options={{ title: "Latest News" }}
        />
        <Tab.Screen
          name="Live"
          component={LiveScreen}
          options={{ title: "Live TV" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
