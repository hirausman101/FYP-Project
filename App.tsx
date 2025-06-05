import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Dashboard from './Dashboard';
import PatientDetails from './PatientDetails';
import Patient from './Patient';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ headerShown: false }}
        />
      <Stack.Screen 
        name="PatientDetails" 
        component={PatientDetails} 
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Patient"
        component={Patient}
        options={{headerShown: false}}
      />
        </Stack.Navigator>
    </NavigationContainer>
  );
}