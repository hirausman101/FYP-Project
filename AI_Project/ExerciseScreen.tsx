import React, { useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, Dimensions } from "react-native";

export default function ExerciseScreen({ route }) {
  const { result } = route.params;
  const CARD_WIDTH = 300;
 const exercises = result.exercise
  ? Object.values(result.exercise).flat()
  : [];


  const numberBarRef = useRef(null);
  const cardBarRef = useRef(null);

  // Sync scroll positions
  const onScroll = (event, ref) => {
    const x = event.nativeEvent.contentOffset.x;
    if (ref.current) {
      ref.current.scrollTo({ x, animated: false });
    }
  };

  return (
    <ImageBackground
      source={require("./assets/bg4.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Number bar */}
       <ScrollView
            ref={numberBarRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH + 18}
            contentContainerStyle={{
                paddingHorizontal: (Dimensions.get("window").width - CARD_WIDTH) / 2,
            }}
            style={{ marginBottom: 8 }}
            scrollEnabled={false}
            >
            {exercises.map((exercise, i) => (
            <View
              key={i}
              style={{
                width: CARD_WIDTH,
                marginRight: 18,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styles.numberTab}>
                <Text style={styles.numberTabText}>{i + 1}</Text>
              </View>
            </View>
          ))}

</ScrollView>
        {/* Exercise cards */}
        <ScrollView
          ref={cardBarRef}
          horizontal
          showsHorizontalScrollIndicator={true}
          snapToInterval={CARD_WIDTH + 18}
          contentContainerStyle={{
            paddingHorizontal: (Dimensions.get("window").width - CARD_WIDTH) / 2,
          }}
          style={{ marginBottom: 24 }}
          onScroll={event => onScroll(event, numberBarRef)}
          scrollEventThrottle={16}
        >
          {exercises.length === 0 && (
            <View style={[styles.card, { alignItems: "center", justifyContent: "center" }]}>
              <Text style={styles.detailText}>No exercises available.</Text>
            </View>
          )}
          {exercises.map((exercise, i) => (
            <View key={i} style={[styles.card, { marginRight: 18 }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={styles.cardImage}
                  source={require("./assets/exercisemain.png")}
                />
                <View style={{ marginLeft: 16, flex: 1,padding: 7 }}>
                  <Text style={styles.cardTitle}>{exercise}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
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
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
 numberTab: {
  width: 150, // or try 48 for a smaller pill
  backgroundColor: "#624e80",
  borderRadius: 20,
  paddingVertical: 8,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 0,
  elevation: 4,
  shadowColor: "#000",
  shadowOpacity: 0.12,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
    },
  numberTabText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    width: 300,
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingLeft: 20,
    paddingRight: 0,
    paddingTop: 0,
    marginBottom: 20,
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
    fontSize: 18,
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
    marginRight: 4,
  },
});