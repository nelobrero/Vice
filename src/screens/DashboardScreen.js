import React, { useState, useEffect } from "react";
import { View, Text, SectionList, Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { subscribeToApplications, STATUS } from "../services/applications";
import { groupByStatus } from "../utils/groupByStatus";
import HeaderCarousel from "../components/HeaderCarousel";

const STATUS_LABELS = {
  [STATUS.ONGOING]: "On Going",
  [STATUS.REJECTED]: "Rejected",
  [STATUS.HIRED]: "Hired",
};

const STATUS_COLORS = {
  [STATUS.ONGOING]: "#EE4A27",
  [STATUS.REJECTED]: "#DB0004",
  [STATUS.HIRED]: "#10AD02",
};

const STATUS_BACKGROUNDS = {
  [STATUS.ONGOING]: "#FFFF",
  [STATUS.REJECTED]: "#FFFF",
  [STATUS.HIRED]: "#FFFF",
};

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToApplications(user.uid, (apps) => {
      const sorted = [...apps].sort((a, b) => (b.dateApplied || "").localeCompare(a.dateApplied || ""));
      setApplications(sorted);
      setLoading(false);
    });
    return unsubscribe;
  }, [user.uid]);

  const groupedApplications = groupByStatus(applications);

  const section = Object.entries(groupedApplications).map(([status, apps]) => {
    return { title: status, data: apps };
  });


  const renderItem = ({ item }) => (

    <View style={{flexDirection: "row", gap: 10, marginBottom: 8, alignItems: "center" }}>
      <View style={[styles.statusDot, { backgroundColor: STATUS_COLORS[item.status] }]}>
        </View>
        <Pressable
      style={[styles.card,  { backgroundColor: STATUS_BACKGROUNDS[item.status] }]}
      onPress={() => navigation.navigate("ApplicationDetails", { application: item })}
    >
      <View style={styles.cardHeader}>
      <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8, alignItems: "center"}}>
      <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.position}>{item.position}</Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "flex-end", gap: 1}}>
      <Text style={styles.date}>Salary: {item.salary ? `$${item.salary}` : "N/A"}</Text>
      <Text style={styles.date}> {item.dateApplied || "N/A"}</Text>
      </View>
      </View>

    </Pressable>
    </View>
    

  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
        <HeaderCarousel userName={user?.displayName?.split(" ")[0] || "there"} applicationCount={applications.length} onLogout={signOut} />
      </View>
      </View>


        <View style={styles.actionRow}>
        <Pressable
        style={styles.pillButton}
        onPress={() => navigation.navigate("AddEditApplication")}
      >
        <Text style={styles.pillButtonText}>+ Add Application</Text>
      </Pressable>
      {/* <Pressable
        style={styles.pillButton}
        onPress={() => navigation.navigate("AddEditApplication")}
      >
        <Text style={styles.pillButtonText}>+ Add Application</Text>
      </Pressable> */}
      </View>
      
     

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} color="#3B82F6" />
      ) : applications.length === 0 ? (
        
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No applications yet.</Text>
          <Text style={styles.emptySubtext}>Tap the button below to add your first one.</Text>
          
        </View>
      ) : (
            <SectionList
              sections={section}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              renderSectionHeader={({ section }) =>
                <Text style={styles.sectionHeader}>{section.title.toUpperCase()}</Text>
              }

              contentContainerStyle={{ paddingBottom: 100 }}
            />
      )}

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff", paddingTop: 20, paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  greeting: { fontSize: 22, fontWeight: "700", color: "#F8FAFC" },
  subGreeting: { fontSize: 13, color: "#94A3B8", marginTop: 2 },
  signOut: { color: "#EF4444", fontSize: 14, fontWeight: "600" },
  card: {
    flex: 1,
    borderRadius: 100,
    padding: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#000000',
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignContent:"center" },
  company: { fontSize: 12, fontWeight: "700", color: "rgb(0, 0, 0)" },
  statusDot: { width: 30, height: 30, borderRadius: 25 },
  position: { fontSize: 10, color: "#000000" },
  date: { fontSize: 8, color: "#64748B"},
  emptyState: { alignItems: "center", marginTop: 80 },
  emptyText: { color: "#F8FAFC", fontSize: 16, fontWeight: "600" },
  emptySubtext: { color: "#94A3B8", fontSize: 13, marginTop: 6, textAlign: "center" },
  sectionHeader: { color: "#94A3B8", fontSize: 13, marginTop: 10, marginBottom: 12 },
  
  actionRow: {
  flexDirection: "row",
  justifyContent: "flex-end",
  gap: 10,
  marginTop: 16,
},
pillButton: {
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 100,   
  borderWidth: 1,
  borderColor: "#334155",
  backgroundColor: "#fff",
},
pillButtonText: {
  color: "#000",
  fontWeight: "600",
  fontSize: 12,
},
});