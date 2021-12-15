import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";

export default function AppButton  ({title, onPress}) {
    
  return(
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#07a8ed",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin:5,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
