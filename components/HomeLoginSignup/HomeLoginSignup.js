import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const HomeLoginSignup = () => {
  return (
    <View style={styles.LoginSignup}>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <LinearGradient colors={["#7068B6", "#5058AD"]} style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <LinearGradient colors={["#7068B6", "#5058AD"]} style={styles.button}>
          <Text style={styles.text}>Sign up</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default HomeLoginSignup;

const styles = StyleSheet.create({
  LoginSignup: {
    display: "flex",
    justifyContent: "center",
    width: "78%",
    margin: "auto",
    marginTop: 27,
    marginBottom: 27,
    gap: 30,
  },
  button: {
    padding: 10,
    borderRadius: 23,
  },
  text: {
    fontSize: 17,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
