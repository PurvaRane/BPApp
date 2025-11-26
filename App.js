
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingPage from "./screens/LandingPage";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";  
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false, 
        }}
      >
        {/* Splash Screen */}
        <Stack.Screen name="Landing" component={LandingPage} />

        {/* Login Screen */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Registration Screen */}
        <Stack.Screen name="Register" component={RegistrationScreen} />  

        {/* Home Screen */}
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
