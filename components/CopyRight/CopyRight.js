import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeCopyRight = () => {
  const currentYear = new Date().getFullYear();
  return (
    <View style={styles.CopyRight}>
      <Text style={styles.versionText}>V1.0</Text>
      <Text style={styles.copyrightText}>
        All rights Copyright@designnet {currentYear}
      </Text>
    </View>
  );
};

export default HomeCopyRight;

const styles = StyleSheet.create({
  CopyRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  versionText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  copyrightText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginBottom: 10,
  },
});
