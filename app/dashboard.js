import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/HeaderDashboad/Header";
import { getUserFromFirestore } from "../api/auth"; // Make sure this function is implemented correctly

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const userData = await getUserFromFirestore(userId);
          setUserInfo(userData);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.MainDashboard}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading user information...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.MainDashboard}>
      <Header />
      <View style={styles.tableContainer}>
        <Text style={styles.tableHeader}>User Information</Text>
        {userInfo ? (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Name:</Text>
              <Text style={styles.tableCell}>{userInfo.name}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Email:</Text>
              <Text style={styles.tableCell}>{userInfo.email}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Mobile:</Text>
              <Text style={styles.tableCell}>{userInfo.mobile}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Created At:</Text>
              <Text style={styles.tableCell}>{userInfo.createdAt}</Text>
            </View>
          </View>
        ) : (
          <Text>No user information available.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  MainDashboard: { backgroundColor: "#fff", flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tableContainer: {
    padding: 16,
    marginTop: 20,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
  },
});
