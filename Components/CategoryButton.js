import { View, Button, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/AntDesign';

export default function AppButton  ({uri, onPress}) {
  return(
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Icon size={20} color="#FFF" name={uri}/>
      
    </TouchableOpacity>
  );
}
  const styles = StyleSheet.create({
    // ...
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