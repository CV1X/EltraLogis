import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text, View, useEffect } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Details from "./screens/Details";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ gestureEnabled: false }} // Disable back gesture for LoginScreen
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
