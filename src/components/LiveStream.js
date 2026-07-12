import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function LiveStream({
  streamUrl = "https://mythrimediaindia.com/knr/",
}) {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: streamUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsFullscreenVideo={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // minHeight: 250,
  },
  webview: {
    flex: 1,
  },
});
