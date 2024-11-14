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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { login } from "../api/auth";

const LoginScreen = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and Password are required.");
      return;
    }
    try {
      const res = await login(email, password);
      if (res.uid) {
        alert("Login successful!");
        router.push("/dashboard");
      } else if (res === "Firebase: Error (auth/invalid-credential).") {
        alert("Incorrect email or password.");
      }
    } catch (error) {
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
        behavior={Platform.OS === "ios" ? "padding" : "position"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
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
              <Text style={styles.welcomeText}>Hi,{"\n"}Welcome back.</Text>

              <Text style={styles.label}>Email :</Text>
              <TextInput
                style={styles.input}
                placeholder="username@email.com"
                placeholderTextColor="#555"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Password :</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="********"
                  placeholderTextColor="#555"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity>
                  {/* Add icon for password visibility toggle here */}
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => router.push("/forgot")}
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push("/signup")}>
                  <Text style={styles.signupLink}>Sign Up</Text>
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  scrollContent: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  mainContent: {
    flex: 1,
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
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: "#4A4A8A",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#4A4A8A",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  signupText: {
    fontSize: 14,
    color: "#4A4A8A",
  },
  signupLink: {
    fontSize: 14,
    color: "#4A4A8A",
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 5,
    marginTop: 12,
  },
  footerText: {
    fontSize: 13,
    color: "#888",
    textAlign: "center",
  },
});
