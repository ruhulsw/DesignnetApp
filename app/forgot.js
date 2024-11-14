import React, { useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { resetPassword } from "../api/auth"; // Import resetPassword function

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showBackToLoginButton, setShowBackToLoginButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button
  const currentYear = new Date().getFullYear();

  const handlePasswordReset = async () => {
    setShowBackToLoginButton(false); // Hide the "Back to Login" button on each reset attempt
    setMessage("");
    setError("");
    setIsLoading(true); // Start loading

    if (!email) {
      setError("Please enter a valid email address.");
      setIsLoading(false); // Stop loading if there's an error
      return;
    }

    const result = await resetPassword(email);
    setIsLoading(false); // Stop loading after response
    if (result === "Password reset email sent!") {
      setMessage(
        "A reset link has been sent to your email. Follow the link to set a new password, then return to the app and log in with your new password."
      );
      setError("");
      setShowBackToLoginButton(true); // Show the "Back to Login" button
    } else {
      setError(result);
      setMessage("");
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        Platform.OS === "android" && { paddingTop: 20 },
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "android" ? 20 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Ensures Android handles taps correctly
        >
          <View style={styles.mainContent}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../assets/images/DesignnetAppLogo.png")}
                style={styles.logo}
              />
            </View>

            {/* Forgot Password Form */}
            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>Forgot Password</Text>
              <Text style={styles.descriptionText}>
                Enter your registered email address to receive password reset
                instructions.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="username@email.com"
                placeholderTextColor="#555"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              {/* Display Success or Error Message */}
              {message ? (
                <Text style={styles.successText}>{message}</Text>
              ) : null}
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handlePasswordReset}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Send Reset Link</Text>
                )}
              </TouchableOpacity>

              {/* Conditionally show "Back to Login" button */}
              {showBackToLoginButton && (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => router.push("/login")}
                >
                  <Text style={styles.submitButtonText}>Back to Login</Text>
                </TouchableOpacity>
              )}

              {/* Back to Login Link */}
              <View style={styles.backToLoginContainer}>
                <Text style={styles.backToLoginText}>
                  Remembered your password?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={styles.backToLoginLink}>Log In</Text>
                </TouchableOpacity>
              </View>
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

export default ForgotPasswordScreen;

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
    textAlign: "center",
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: "#000",
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
  submitButton: {
    backgroundColor: "#4A4A8A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backToLoginContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  backToLoginText: {
    fontSize: 14,
    color: "#4A4A8A",
  },
  backToLoginLink: {
    fontSize: 14,
    color: "#4A4A8A",
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
  successText: {
    color: "green",
    marginVertical: 10,
    textAlign: "center",
    backgroundColor: "#e9f7ef",
    padding: 10,
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
    backgroundColor: "#e9f7ef",
    padding: 10,
    borderRadius: 10,
  },
});
