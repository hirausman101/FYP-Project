import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions } from "react-native";

export default function FoodScreen({ route }) {
  const { result } = route.params;
  const [tab, setTab] = useState("Ingredients");
  const foodEntries = result.food ? Object.entries(result.food) : [];
 
  const allFoods = foodEntries.flatMap(([_, foods]) => foods);
  const CARD_WIDTH = 300;

  // Only use meals actually returned by backend
  const [mainIndex, setMainIndex] = useState(0);

  // Get current meal's foods
  const currentFoods = foodEntries[mainIndex]?.[1] || [];
  const mealName = foodEntries[mainIndex]?.[0] || "";
  const suggestionsArr = (result.additional_meal_suggestions && result.additional_meal_suggestions[mealName]) || [];
  const suggestions = suggestionsArr.filter(
    (sugg) =>
      sugg.matched_foods &&
      sugg.matched_foods.some((matched) =>
        currentFoods.some(food =>
          food.toLowerCase().includes(matched.toLowerCase())
        )
      )
  );

  return (
    <ImageBackground
      source={require("./assets/bg3.png")}
      style={styles.background}
    >

    <View style={styles.container}>
  {/* Tab Bar */}
  <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 60, marginBottom: 20, }}> 
    {["Medication", "Food Suggestions"].map((t) => (
      <TouchableOpacity
        key={t}
        style={[
          { paddingHorizontal: 24, paddingVertical: 10, marginHorizontal: 8, borderBottomColor: tab === t ? "#624e80" : "transparent", borderBottomWidth: tab === t ? 3 : 0 }
        ]}
        onPress={() => setTab(t)}
      >
        <Text style={{ fontSize: 18, color: tab === t ? "#624e80" : "#888", fontWeight: "bold" }}>{t}</Text>
      </TouchableOpacity>
    ))}
  </View>

 {tab === "Medication" ? (
  <ScrollView style={{ width: "100%" }}>
    <View style={{ alignItems: "center",marginBottom:50, }}>
      {(!result.medication_advice || result.medication_advice.length === 0) ? (
        <Text style={styles.detailText}>No medication information available.</Text>
      ) : (
        result.medication_advice.map((med, i) => (
          <View key={i} style={[styles.card2, {marginTop:50,padding:15,}]}>
            <View style={{ flexDirection: "row", gap:20,marginBottom: 10, alignItems: "center" }}>
            <Image
              style={[styles.cardImage, { width: 60, height: 60 }]} // smaller image for better alignment
              source={require("./assets/medicationicon.png")}
            />
            <Text style={[styles.cardTitle, {fontSize: 16}]}>
              {med.medication}
            </Text>
            </View>
            <Text style={styles.detailText2}>Effectiveness:</Text>
            <Text>{med.effectiveness}</Text>
            <Text style={styles.detailText2}>Side Effect Risk: </Text>
            <Text>{med.side_effect_risk}</Text>
            <Text style={styles.detailText2}>Advice:</Text>
            <Text>{med.advice}</Text>
          </View>
        ))
      )}
    </View>
  </ScrollView>
) : (
    <>
  
      {/* Meal Tabs and Suggestions as before */}
      {foodEntries.length > 1 && (
        <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 0, marginTop: 0, marginLeft: 15,}}>
          {foodEntries.map(([meal], idx) => (
            <TouchableOpacity
              key={meal}
              style={[
                styles.thumbCard,
                idx === mainIndex && { borderColor: "#624e80", borderWidth: 2 },
              ]}
              onPress={() => setMainIndex(idx)}
            >
              <Text style={styles.thumbLabel}>
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

 <View style={{ width: "100%", alignItems: "center", flex: 1, marginTop: 20,marginBottom: 50 }}>
    <View style={[
      styles.card1,
      { flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start",paddingBottom: 10 }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.cardTitle, { fontSize: 16, marginTop:10 }]}>
         Recommended Food: </Text>
        {(foodEntries[mainIndex]?.[1]?.length === 0 || !foodEntries[mainIndex]) ? (
          <Text style={styles.detailText}>No foods available.</Text>
        ) : (
          <Text
            style={[
              styles.detailText,
              {fontSize:14, flexShrink: 1, flexWrap: "wrap", maxWidth: 250 }
            ]}
            numberOfLines={0}
          >
            {foodEntries[mainIndex][1].join(", ")}
          </Text>
        )}
      </View>
    </View>
  </View>
      {/* Suggestions ScrollView (keep your existing code here) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={true}
        snapToInterval={CARD_WIDTH + 18}
        contentContainerStyle={{
          paddingHorizontal: (Dimensions.get("window").width - CARD_WIDTH) / 2,
        }}
        style={{ marginBottom: 24,marginTop: 50 }}
      >
        {suggestions.length === 0 && (
          <View style={[styles.card, { alignItems: "center", justifyContent: "center" }]}>
            <Text style={styles.detailText}>No suggestions available.</Text>
          </View>
        )}
        {suggestions.map((sugg, i) => (
          <View key={i} style={[styles.card, { marginRight: 18 }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={styles.cardImage}
                source={require("./assets/foodmain.png")}
              />
              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={styles.cardTitle}>
                  {sugg.suggestion || sugg.title || ""}
                </Text>
                {sugg.matched_foods && sugg.matched_foods.length > 0 && (
                  <Text style={[styles.detailText, { color: "#624e80", fontSize: 14, marginLeft: 0 }]}>
                    Suggested Ingredient{(sugg.matched_foods.length > 1 ? "s" : "")}: {sugg.matched_foods.join(", ")}
                  </Text>
                )}
                {sugg.ingredients && sugg.ingredients.length > 0 && (
                  <Text style={[styles.detailText, { color: "#888", fontSize: 13, marginLeft: 0 }]}>
                    Benefits: {sugg.ingredients.join(", ")}
                  </Text>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </>
      )}
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
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  card: {
  width: 300,
  height: 150,
  backgroundColor: "#fff",
  borderRadius: 24,
  paddingLeft: 20,
  paddingRight: 0,
  paddingTop: 0,
  marginBottom: 20,
  // REMOVE marginLeft and marginRight here!
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
  minHeight: 120,
  justifyContent: "center",
  alignContent: "center",
},
card2: {
  width: 300,
  
  backgroundColor: "#fff",
  borderRadius: 24,
  // REMOVE marginLeft and marginRight here!
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
  minHeight: 120,
  justifyContent: "center",
  alignContent: "center",
},
  card1: {
  width: 300,
  backgroundColor: "#fff",
  borderRadius: 24,
  paddingLeft: 20,
  // REMOVE marginLeft and marginRight here!
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3,
  minHeight: 120,
  justifyContent: "center",
  alignContent: "center",
},

  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#624e80",
    marginBottom: 8,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: "#BAD8B6",
  },
  detailText: {
    color: "#444",
    fontSize: 15,
    marginLeft: 6,
    marginBottom: 2,
  },
  detailText2: {
    color: "#444",
    fontSize: 15,
    fontWeight: "bold",
  },
  thumbCard: {
    width: 90,
    alignItems: "center",
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  thumbLabel: {
    fontSize: 14,
    color: "#624e80",
    fontWeight: "bold",
    textAlign: "center",
  },
  

});