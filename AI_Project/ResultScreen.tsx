import { toFormData } from "axios";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions } from "react-native";

export default function ResultScreen({ route, navigation }) {
  const { result } = route.params;
  const CARD_WIDTH = 300;

  // Get food entries as array
  const foodEntries = result.food ? Object.entries(result.food) : [];
  const [mainIndex, setMainIndex] = useState(0);

  // Get current meal's foods
  const currentFoods = foodEntries[mainIndex]?.[1] || [];

    const allSuggestions = result.additional_meal_suggestions
      ? Object.values(result.additional_meal_suggestions).flat()
      : [];
    const suggestions = allSuggestions.filter(
      (sugg) =>
        sugg.matched_foods &&
        sugg.matched_foods.some((matched) =>
          currentFoods.some(food =>
            food.toLowerCase().includes(matched.toLowerCase())
          )
        )
    );

  // Tab state: 0 = Diet, 1 = Exercise
  const [selectedTab, setSelectedTab] = useState(0);


 return (
  <ImageBackground
    source={require("./assets/mainbg1.png")}
    style={styles.background}
  >
    <View style={styles.centerColumn}>
      <TouchableOpacity
        style={styles.bigTab}
       onPress={() => navigation.navigate("Food", { result })}
      >
        <Image  style={{width:50,height:50,}} source={require("./assets/foodicon.png")} />
        <Text style={styles.bigTabLabel}>Diet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bigTab}
         onPress={() => navigation.navigate("Exercise", { result })}
      >
        <Image style={{width:50,height:50,}} source={require("./assets/exerciseicon.png")} />
        <Text style={styles.bigTabLabel}>Exercise</Text>
      </TouchableOpacity>
    </View>
  </ImageBackground>
);
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  centerColumn: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
},
bigTab: {
  width: 220,
  paddingVertical: 28,
  backgroundColor: "#fff",
  borderRadius: 30,
  marginVertical: 18,
  alignItems: "center",
  elevation: 4,
  shadowColor: "#000",
  shadowOpacity: 0.10,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
},
bigTabLabel: {
  fontSize: 22,
  color: "#624e80",
  fontWeight: "bold",
  letterSpacing: 1,
},  
});
