import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ButtonCustom from "../components/UI/ButtonCustom";
import { GlobalStyles } from "../constents/styles";

const ErrorUI = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}> An error occurred! </Text>
      <Text style={styles.text}>{ message }</Text>
      <ButtonCustom onPress={onConfirm}> Okay </ButtonCustom>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ErrorUI;
