import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header/Header";
import HomeIcon from "../components/HomeIcon/HomeIcon";
import HomeLoginSignup from "../components/HomeLoginSignup/HomeLoginSignup";
import HomeCopyRight from "../components/CopyRight/CopyRight";

const Index = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        router.replace("/dashboard");
      } else {
        setIsCheckingAuth(false); // Only show the screen if no token is found
      }
    };

    checkToken();
  }, []);

  if (isCheckingAuth) {
    return null; // Render nothing while checking for the token
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.heading}>
            Connect and Collaborate With Top Design Teams
          </Text>

          <Text style={styles.subheading}>
            Boost your business and product development by defining projects and
            tasks for your design needs. Find highly experienced graphic design
            teams and freelancers in DesignNet and let them do the job for you.
          </Text>
          <HomeIcon />
          <HomeLoginSignup />
          <Text style={styles.TextBelowSignup}>
            If you are job owner or freelance designer you need to know more
            about Designnet ask online help here.
          </Text>
        </View>
      </ScrollView>

      <HomeCopyRight />
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  content: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heading: {
    fontSize: 27,
    fontWeight: "600",
    color: "#4A4A8A",
    textAlign: "center",
    marginTop: 20,
    padding: 20,
  },
  subheading: {
    fontSize: 17,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
    padding: 20,
  },
  TextBelowSignup: {
    fontSize: 14,
    color: "#888",
    textAlign: "left",
    width: "75%",
  },
});
