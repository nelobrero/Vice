import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { updateApplication, deleteApplication, STATUS } from "../services/applications";
import { confirmAction } from "../utils/confirm";
import { useAuth } from "../context/AuthContext";

const STATUS_LABELS = {
  [STATUS.ONGOING]: "On Going",
  [STATUS.REJECTED]: "Rejected",
  [STATUS.HIRED]: "Hired",
};

const STATUS_COLORS = {
 [STATUS.ONGOING]: "#DB5B00",
  [STATUS.REJECTED]: "#DB0004",
  [STATUS.HIRED]: "#10AD02",
};

export default function ApplicationDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { application } = route.params;
  const { user } = useAuth();

  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await updateApplication(application.id, { status: newStatus });
      if (newStatus === STATUS.HIRED) {
        navigation.replace("Congratulations", { application: { ...application, status: newStatus }, userName: user?.displayName?.split(" ")[0] || "there", });
      } else {
        navigation.goBack();
      }
    } catch (err) {
      Alert.alert("Couldn't update", err.message);
    } finally {
      setUpdating(false);
    }
  };

   const handleDelete = () => {
    confirmAction(
      "Delete application?",
      `This will remove ${application.company} from your list.`,
      async () => {
        try {
          await deleteApplication(application.id);
          navigation.goBack();
        } catch (err) {
          Alert.alert("Couldn't delete", err.message);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Go Back</Text>
      </Pressable>

      <Text style={styles.company}>{application.company}</Text>
      <Text style={styles.position}>{application.position}</Text>

      <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[application.status] }]}>
        <Text style={styles.statusBadgeText}>{STATUS_LABELS[application.status]}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Date Applied</Text>
        <Text style={styles.infoValue}>{application.dateApplied}</Text>
      </View>

      {application.salary ? (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Salary</Text>
          <Text style={styles.infoValue}>₱{Number(application.salary).toLocaleString()}</Text>
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Change Status</Text>
      <View style={styles.statusButtons}>
        {Object.values(STATUS).map((s) => (
          <Pressable
            key={s}
            style={[
              styles.statusButton,
              { borderColor: STATUS_COLORS[s] },
              application.status === s && { backgroundColor: STATUS_COLORS[s] },
            ]}
            disabled={updating}
            onPress={() => handleStatusChange(s)}
          >
            <Text
              style={[
                styles.statusButtonText,
                application.status === s && { color: "#000000" },
              ]}
            >
              {STATUS_LABELS[s]}
            </Text>
          </Pressable>
        ))}
      </View>

      {updating && <ActivityIndicator style={{ marginTop: 16 }} color="#3B82F6" />}

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Application</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff", padding: 20, paddingTop: 60 },
  back: { color: "#EE4A27", fontSize: 15, marginBottom: 20 },
  company: { fontSize: 24, fontWeight: "700", color: "#000000" },
  position: { fontSize: 16, color: "#000000", marginBottom: 16 },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
  },
  statusBadgeText: { color: "#000000", fontWeight: "600", fontSize: 12   },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1E293B",
  },
  infoLabel: { color: "#000000", fontSize: 12 },
  infoValue: { color: "#000000", fontSize: 12, fontWeight: "600" },
  sectionTitle: { color: "#000000", fontSize: 12, marginTop: 28, marginBottom: 12 },
  statusButtons: { flexDirection: "row", gap: 10 },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1.5,
    alignItems: "center",
  },
  statusButtonText: { color: "#000000", fontWeight: "600", fontSize: 12 },
  deleteButton: { marginTop:20, backgroundColor: "#EE4A27",
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
    paddingHorizontal: 16},
  deleteButtonText: { color: "#000000", fontSize: 14, fontWeight: "600" },
});