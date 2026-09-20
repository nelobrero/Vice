import React from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { useFonts, BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts ({
    BebasNeue_400Regular,
  })

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0F172A" }}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }
  
  return (
    <AuthProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </AuthProvider>
  );
}
