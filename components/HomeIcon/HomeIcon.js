import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";

const HomeIcon = () => {
  return (
    <View style={styles.IconeSection}>
      <TouchableOpacity style={styles.IconeBg}>
        <AntDesign name="home" size={26} color="#7F8D95" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.IconeBg}>
        <Ionicons name="notifications-outline" size={26} color="#7F8D95" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.IconeBg}>
        <AntDesign name="hearto" size={26} color="#7F8D95" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.IconeBg}>
        <Feather name="bookmark" size={26} color="#7F8D95" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeIcon;

const styles = StyleSheet.create({
  IconeSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },
  IconeBg: {
    backgroundColor: "#E2ECF6",
    padding: 10,
    borderRadius: 40,
  },
});
