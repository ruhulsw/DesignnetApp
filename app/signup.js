import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signup } from "../api/auth";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button
  const currentYear = new Date().getFullYear();

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

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const user = await signup(name, email, mobile, password);
      setIsLoading(false); // Stop loading after response
      if (user.message === "Firebase: Error (auth/email-already-in-use).") {
        alert("User Already Exist");
        return;
      }
      if (user.uid) {
        router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false); // Stop loading on error
      alert(error.message);
    }
  };

  if (isCheckingAuth) {
    return null; // Render nothing while checking for the token
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        Platform.OS === "android" && { paddingTop: 20 },
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjusted for Android
        keyboardVerticalOffset={Platform.OS === "android" ? 0 : 30}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Ensures tapping outside closes keyboard
        >
          <View style={styles.mainContent}>
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => router.push("/")}
            >
              <Image
                source={require("../assets/images/DesignnetAppLogo.png")}
                style={styles.logo}
              />
            </TouchableOpacity>

            <View style={styles.formContainer}>
              <Text style={styles.welcomeText}>Create Account</Text>

              <Text style={styles.label}>Name :</Text>
              <TextInput
                style={styles.input}
                placeholder="Your Name"
                placeholderTextColor="#555"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Email :</Text>
              <TextInput
                style={styles.input}
                placeholder="username@email.com"
                placeholderTextColor="#555"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Mobile Number :</Text>
              <TextInput
                style={styles.input}
                placeholder="+1 234 567 890"
                placeholderTextColor="#555"
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
              />

              <Text style={styles.label}>Password :</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#555"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />

              <Text style={styles.label}>Confirm Password :</Text>
              <TextInput
                style={styles.input}
                placeholder="********"
                placeholderTextColor="#555"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSignup}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.signupButtonText}>Sign up</Text>
                )}
              </TouchableOpacity>

              <View style={styles.loginTextContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/login")}>
                  <Text style={styles.loginLink}>LogIn</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

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

export default SignupScreen;

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
    marginBottom: 10,
    marginTop: 10,
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
  signupButton: {
    backgroundColor: "#4A4A8A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginTextContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  loginText: {
    fontSize: 14,
    color: "#4A4A8A",
  },
  loginLink: {
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
});
