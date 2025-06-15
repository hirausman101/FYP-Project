import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Dashboard from './Dashboard';
import PatientDetails from './PatientDetails';
import Patient from './Patient';
import CarePlan from './CarePlan';
import MedicationPlan from './MedicationPlan';
import Location from './Location';
import Index from './main';
import Login from './login';
import Signup from './signup';
import ResetPassword from './reset-password';
import CaregiverProfile from './caregiverProfile';
import EditProfile from './editProfile';


const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Index" 
          component={Index}
          options={{ headerShown: false }}
        />
          <Stack.Screen 
          name="Login" 
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ResetPassword" 
          component={ResetPassword}
          options={{ headerShown: false }}
        />
          <Stack.Screen 
          name="Signup" 
          component={Signup}
          options={{ headerShown: false }}
        />
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
      <Stack.Screen
        name="CarePlan"
        component={CarePlan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MedicationPlan"
        component={MedicationPlan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Location"
        component={Location}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CaregiverProfile"
        component={CaregiverProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
        </Stack.Navigator>
    </NavigationContainer>
  );
}