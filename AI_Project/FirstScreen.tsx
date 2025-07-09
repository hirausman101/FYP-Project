
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function FirstScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <Image
            source={require("./assets/abstract_main.png")} // Ensure you have a logo image in the assets folder
            style={styles.logo}/>
        <View style={{padding:20}}>
      <Text style={styles.title}>Welcome to Parkinson's HealthSync!</Text>
      <Text style={styles.summary}>
        This app provides personalized health, nutrition, and exercise recommendations for people with Parkinson's disease. 
        Get meal suggestions, exercise tips, and medication guidance tailored to your needs.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("Main")}
      >
        
        
        <Text style={styles.buttonText}>Get Recommendations</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5df",
  },
  logo: {
    height:150,
    width: '100%',
  },
  title: {
    marginTop:30,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  summary: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#8fa88c",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 25,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    letterSpacing:2,
  },
});