import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { addApplication } from "../services/applications";

export default function AddEditApplicationScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [dateApplied, setDateApplied] = useState("");
  const [salary, setSalary] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!company.trim() || !position.trim() || !dateApplied.trim()) {
      Alert.alert("Missing info", "Company, position, and date applied are required.");
      return;
    }

    setSaving(true);
    console.log("Attempting save for user:", user?.uid);
    try {
      const result = await addApplication(user.uid, {
        company: company.trim(),
        position: position.trim(),
        dateApplied: dateApplied.trim(),
        salary: salary.trim() ? Number(salary) : null,
      });
      console.log("Save succeeded, doc id:", result.id);
      navigation.goBack();
    } catch (err) {
      console.log("Save failed:", err.message);
      Alert.alert("Couldn't save", err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.container1}>
        <Text style={styles.title}>New Application</Text>
      </View>

      <Text style={styles.label}>Company</Text>
      <TextInput
        style={styles.input}
        value={company}
        onChangeText={setCompany}
        placeholder="e.g. Google"
        placeholderTextColor="#64748B"
      />

      <Text style={styles.label}>Position</Text>
      <TextInput
        style={styles.input}
        value={position}
        onChangeText={setPosition}
        placeholder="e.g. Software Engineer I"
        placeholderTextColor="#64748B"
      />

      <Text style={styles.label}>Date Applied</Text>
      <TextInput
        style={styles.input}
        value={dateApplied}
        onChangeText={setDateApplied}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#64748B"
      />

      <Text style={styles.label}>Salary (optional)</Text>
      <TextInput
        style={styles.input}
        value={salary}
        onChangeText={setSalary}
        placeholder="e.g. 45000"
        placeholderTextColor="#64748B"
        keyboardType="numeric"
      />

     <View style={styles.buttons}>
       <Pressable style={styles.saveButton} onPress={handleSave} disabled={saving}>
        {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Save Application</Text>}
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
     </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFF" },
  container1: {rowGap: 50,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#EE4A27", 
    borderRadius: 20},
  content: { padding: 20, paddingTop: 20 },
  title: { fontSize: 45, fontFamily: "BebasNeue_400Regular", color: "#000" },
  label: { color: "#000000", fontSize: 12, marginBottom: 6, marginTop: 14 },
  input: {
    
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#000000",
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#000000",
  },
  buttons: {
    flexDirection: "row", gap: 12, justifyContent: "flex-end", marginTop: 20
  },
  saveButton: {
    backgroundColor: "#0F9036",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  saveButtonText: { color: "#000000", fontWeight: "600", fontSize: 12 },
  cancelButton: {  backgroundColor: "#EE4A27",
    borderRadius: 100,
    paddingVertical: 10,
    alignItems: "center",
    paddingHorizontal: 16
   },
  cancelButtonText: { color: "#000000", fontWeight: "600", fontSize: 12 },
});