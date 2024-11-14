import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const OtpVerificationScreen = () => {
  const currentYear = new Date().getFullYear();

  return (
    <SafeAreaView
      style={[
        styles.container,
        Platform.OS === "android" && { paddingTop: 20 },
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        keyboardVerticalOffset={Platform.OS === "android" ? 30 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.mainContent}>
            {/* Logo */}
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => router.push("/")}
            >
              <Image
                source={require("../assets/images/DesignnetAppLogo.png")}
                style={styles.logo}
              />
            </TouchableOpacity>

            {/* OTP Verification Form */}
            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>OTP Verification</Text>
              <Text style={styles.descriptionText}>
                Enter the OTP sent to your email to verify your account.
              </Text>

              <Text style={styles.label}>OTP :</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                placeholderTextColor="#555"
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={styles.verifyButton}
                onPress={() => router.push("/set_pass")}
              >
                <Text style={styles.verifyButtonText}>Verify OTP</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>V1.0</Text>
            <Text style={styles.footerText}>
              All rights Copyright@designnet {currentYear}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  mainContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#34c6cf",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    color: "#4A4A8A",
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#4A4A8A",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  verifyButton: {
    backgroundColor: "#4A4A8A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
    marginTop: 5,
  },
});
