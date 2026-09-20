import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "../services/firebase";

WebBrowser.maybeCompleteAuthSession();

// Fill these in once you've created OAuth client IDs in the Google Cloud Console
// (console.cloud.google.com → APIs & Services → Credentials).
// You need one "Web" client ID and one "iOS" client ID for Expo's proxy flow.
const GOOGLE_CLIENT_ID = {
  webClientId: "715541096682-5e665tia07gbvsm6ldh7cfpestdhfmt4.apps.googleusercontent.com",
  iosClientId: "1083577948129-2psrfqs2q88n88qvqcqks4i86va7n9vv.apps.googleusercontent.com",
};

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_CLIENT_ID.webClientId,
    iosClientId: GOOGLE_CLIENT_ID.iosClientId,
    // Gmail readonly scope added now so we don't have to re-consent later
    // when we build the auto-status-detection feature.
    scopes: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token, access_token } = response.params;
      setLoading(true);
      const credential = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credential)
        .catch((err) => Alert.alert("Sign-in failed", err.message))
        .finally(() => setLoading(false));
    } else if (response?.type === "error") {
      Alert.alert("Sign-in error", "Something went wrong. Please try again.");
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
      <View style={styles.container1}>
        <Pressable
        style={styles.button}
        disabled={!request || loading}
        onPress={() => promptAsync()}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue with Google</Text>
        )}
      </Pressable>
      </View>    
      <View style={styles.shape}>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",
    justifyContent: "flex-start",
    alignContent: "center"  
  },
  container1: {
    paddingHorizontal: 40,
  },
  title: {
    marginTop:40,
    fontSize: 150,
    fontFamily: "BebasNeue_400Regular",
    color: "#000000",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#0F9036",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 16,
  },
  shape: {
    marginTop:40,
    flex: 1,
    backgroundColor: "#0F9036",
    justifyContent: "flex-start",
    borderTopLeftRadius: 150
  },
});
