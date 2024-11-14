import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Logo and title */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://path-to-your-logo.png" }}
          style={styles.logo}
        />
        <Text style={styles.title}>designnet.app</Text>
      </View>

      {/* Main heading */}
      <Text style={styles.heading}>
        Connect and Collaborate With Top Design Teams
      </Text>

      {/* Subheading */}
      <Text style={styles.subheading}>
        Boost your business and product development by defining projects and
        tasks for your design needs. Find highly experienced graphic design
        teams and freelancers in DesignNet and let them do the job for you.
      </Text>

      {/* Icons row */}
      <View style={styles.iconsRow}>
        {/* Replace the URIs with the correct icon image paths */}
        <Image
          source={{ uri: "https://path-to-icon1.png" }}
          style={styles.icon}
        />
        <Image
          source={{ uri: "https://path-to-icon2.png" }}
          style={styles.icon}
        />
        <Image
          source={{ uri: "https://path-to-icon3.png" }}
          style={styles.icon}
        />
        <Image
          source={{ uri: "https://path-to-icon4.png" }}
          style={styles.icon}
        />
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Footer text */}
      <Text style={styles.footerText}>
        If you are job owner or freelance designer you need to know more about
        Designnet ask online help here.
      </Text>

      {/* Version info */}
      <Text style={styles.versionText}>V1.0</Text>
      <Text style={styles.copyrightText}>
        All rights Copyright@designnet2023
      </Text>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A4A8A",
    textAlign: "center",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  button: {
    backgroundColor: "#4A4A8A",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 60,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  versionText: {
    fontSize: 10,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  copyrightText: {
    fontSize: 10,
    color: "#888",
    textAlign: "center",
    marginBottom: 10,
  },
});
