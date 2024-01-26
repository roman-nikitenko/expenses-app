import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { GlobalStyles } from "../../constents/styles";

const Input = ({
  label,
  textInputConfig,
  style,
  field,
  changeHandler,
  isDangerous
}) => {
  let inputStyles = [styles.input, isDangerous ? styles.isDangerous : ''];

  if (textInputConfig && textInputConfig.multiple) {
    inputStyles = [
      ...inputStyles,
      styles.inputMultiline
    ]
  }


  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[
        styles.label,
        isDangerous ? styles.isDangerousText : ''
      ]}
        >
        {label}
      </Text>
      <TextInput
        onChangeText={(item) => changeHandler(field, item)}
        style={inputStyles}
        {...textInputConfig}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal:4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  isDangerous: {
    borderWidth: 2,
    borderColor: GlobalStyles.colors.error500
  },
  isDangerousText: {
    color: GlobalStyles.colors.error500,
  }
});

export default Input;
