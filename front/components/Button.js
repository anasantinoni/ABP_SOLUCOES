import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Button({ title, onPress, icon, style }) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {icon && <Icon name={icon} size={20} color="#FFFFFF" style={styles.icon} />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0056B3",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
    width: "80%",
    marginBottom: 20,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Montserrat",
  },
  icon: {
    marginRight: 10,
  },
});
