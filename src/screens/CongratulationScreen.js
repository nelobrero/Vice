import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CongratulationsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { application, userName } = route.params;

  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container1}> 
      <Animated.View style={{ transform: [{ scale }], opacity }}>
        <Text style={styles.title}>Congrats {userName}!</Text>
        <Text style={styles.subtitle}>
          You’ve been hired as {"\n"}
           <Text style={styles.position}>{application.position}</Text>
        </Text>
       <Text style={styles.company}> at {application.company}</Text>
      </Animated.View>
      <View style={styles.button}>
       <Pressable
        style={styles.doneButton}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <Text style={styles.doneButtonText}>Back to Dashboard</Text>
      </Pressable>
     </View>
      
      </View>
      

     <View style={styles.shape}>
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
  title: { fontSize: 60, fontFamily: "BebasNeue_400Regular", color: "#000000", textAlign: "flex-start", lineHeight: 55 },
  subtitle: {
    fontStyle: "italic",
    fontSize: 24,
    color: "#000000",
    textAlign: "flex-start",
    marginTop: 12,
    lineHeight: 24,
  },
  company: { color: "#000000", fontSize: 24, fontStyle: "italic", },
  position: {
    fontSize: 24,
    color: "#000000",
    textAlign: "flex-start",
    fontStyle: "italic",
    marginTop: 4,
  },
  button:{
     justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  doneButton: {
    marginTop: 16 ,
    backgroundColor: "#0F9036",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 100,
  },
  doneButtonText: { color: "#00000", fontWeight: "600", fontSize: 16 },

  shape: {
  flex: 1,
    backgroundColor: "#EE4A27",
    justifyContent: "flex-start",
    padding: 50,
    borderTopRightRadius: 150
  }
});