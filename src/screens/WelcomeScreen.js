import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.text}>VICE</Text>
      </View>
      <View style={styles.shape}>
        <View style={styles.content}>
          <Text style={styles.taglinetext}>never lose sight{"\n"}of your next{"\n"}career opportunity</Text>
         <View style={styles.button}>
               <Pressable
                style={styles.doneButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.doneButtonText}>Get Started</Text>
              </Pressable>
             </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-start",
    padding: 1,
  },
  container1: {
    justifyContent: "flex-start", margin: 40
  },
  text: { fontSize: 150, fontFamily: "BebasNeue_400Regular", color: "#000000", textAlign: "flex-start"},
  taglinetext: { fontSize: 30, fontFamily: "BebasNeue_400Regular", color: "#000000", textAlign: "flex-start", lineHeight: 30 },
  shape: {
    flex: 1,
    backgroundColor: "#EE4A27",
    justifyContent: "flex-start",
    borderTopRightRadius: 150
  },
  content: {
    marginTop: 40,
    paddingHorizontal: 30,
  },
  button:{
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  doneButton: {
    marginTop: 16,
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
  },
  doneButtonText: { color: "#00000", fontWeight: "600", color: "#EE4A27", fontSize: 16 },

  
});