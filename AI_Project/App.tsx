import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { enableScreens } from 'react-native-screens';
import MainScreen from "./MainScreen";
import ResultScreen from "./ResultScreen";
import HomeScreen from "./HomeScreen";
import FirstScreen from "./FirstScreen"; // Assuming you have a FirstScreen component
import FoodScreen from "./FoodScreen"; // Assuming you have a FoodScreen component
import ExerciseScreen from "./ExerciseScreen";


enableScreens();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen} />
          < Stack.Screen
          options={{headerShown:false}}
          name="First" 
          component={FirstScreen}/>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Food"
          component={FoodScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Exercise"
          component={ExerciseScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}