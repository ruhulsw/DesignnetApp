import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MainLogo = require("../../assets/images/DesignnetAppLogo.png");
import { router } from "expo-router";

const Header = () => {
  const logOut = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userId");
    router.push("/");
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <SimpleLineIcons name="menu" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/")}>
        <View style={styles.logoSection}>
          <Image source={MainLogo} style={styles.logo} />
          <Text style={styles.title}>designnet</Text>
          <Text style={styles.titleSpan}>.app</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginTop: 10,
  },
  logoSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { height: 50, width: 50 },
  title: {
    fontSize: 37,
  },
  titleSpan: {
    marginTop: 17,
    fontSize: 15,
  },
});
