import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";

export default function HomeScreen({ navigation }) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Show HomeScreen content for 3 seconds, then show loading for 2 seconds, then navigate
    const showLoadingTimer = setTimeout(() => {
      setShowLoading(true);
      const navigateTimer = setTimeout(() => {
        navigation.replace("First");
      }, 2000); // Loading spinner duration

      return () => clearTimeout(navigateTimer);
    }, 4000); // HomeScreen content duration

    return () => clearTimeout(showLoadingTimer);
  }, [navigation]);

  if (showLoading) {
    return (
      <View style={[styles.mainPage, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: "white", marginTop: 20, fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainPage}>
      <View style={{ paddingTop: 80, justifyContent: "flex-start", alignItems: "center" }}>
        <Image
          source={require("./assets/food.png")}
          style={{ width: 250, height: 250 }}
        />
      </View>
      <View style={{ paddingBottom: 0 }}>
        <Text style={{ fontFamily: "sofia", color: "white", fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Parkinson's HealthSync
        </Text>
      </View>
      <View style={{ paddingTop: 0, justifyContent: "flex-start", alignItems: "center" }}>
        <Image
          source={require("./assets/exercise.png")}
          style={{ width: 250, height: 250 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    height: "100%",
    width: "100%",
    backgroundColor: "#624e80",
  },
});