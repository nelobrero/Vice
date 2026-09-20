import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet, Pressable } from "react-native";


//const { width } = Dimensions.get("window");

export default function HeaderCarousel({ userName, applicationCount, onLogout }) {
    const [containerWidth, setContainerWidth] = useState(0);
    const [activePage, setActivePage] = useState(0);

    const handleScroll = (event) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const pageIndex = Math.round(scrollX / containerWidth);
      setActivePage(pageIndex);
    }


  return (
    <View style={{ width: "100%" }}
        onLayout={(event) => {
            const measureWidth = event.nativeEvent.layout.width;
            setContainerWidth(measureWidth);
        }}
    >
        <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={handleScroll}
      scrollEventThrottle={4}
      style={styles.container}
    >
      <View style={[styles.page, { width: containerWidth }]}>
        <Text style={styles.title}>Hi {userName}!</Text>
      </View>

      <View style={[styles.page, { width:containerWidth }]}>
        <Text style={styles.title}>{applicationCount} Applications</Text>
      </View>

      <View style={[styles.page, { width:containerWidth }]}>
        <Pressable onPress={onLogout}>
          <Text style={styles.title}>Sign out</Text>
        </Pressable>
      </View>
    </ScrollView>
    <View style={styles.dotsRow}>
      {[0, 1, 2].map((pageIndex)=>(
        <View 
          key={pageIndex}
          style={[
            styles.dot,
            pageIndex === activePage && styles.dotActive,
          ]}
        />
      ))}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 170 },
  page: {
    rowGap: 50,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#589BEB",
    borderRadius: 20,
  },
  title: { fontSize: 50, fontFamily:"BebasNeue_400Regular" , color: "#000" },
  dotsRow: {justifyContent: "center", flexDirection: "row", gap: 2, marginTop: 10},
  dot: {height: 6, width: 6, borderRadius:100, backgroundColor: "#000"},
  dotActive: {backgroundColor: "#589BEB"}
});