import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { GlobalStyles } from "../../constents/styles";

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  }
});

export default Loader;
