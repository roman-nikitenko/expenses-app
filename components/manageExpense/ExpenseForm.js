import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Input from "./Input";
import ButtonCustom from "../UI/ButtonCustom";
import { getFormattedDate } from "../../util/date";

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLable, defaultValue }) => {
  const today = new Date().toJSON().slice(0, 10).replace(/-/g,'-');

  const [inputValues, setInputValue] = useState({
    amount:  defaultValue ? defaultValue.amount.toString() : '',
    date: today,
    description: defaultValue ? defaultValue.description.toString() : '',
  });

  const [errors, setErrors] = useState({
    amount: false,
    date: false,
    description: false,
  })

  const changeHandler = (field, value) => {
    setInputValue(prevState => ({ ...prevState, [field]: value }));
    setErrors(prevState => ({ ...prevState, [field]: false }));
  };


  const submitHandler = () => {
    const newExpense = {
      amount: +inputValues.amount,
      description: inputValues.description,
      date: new Date(inputValues.date),
    }

    const amountValid = !isNaN(newExpense.amount) && newExpense.amount > 0;
    const descriptionValid = newExpense.description.trim().length > 0;
    const dateValid = newExpense.date.toString() !== 'Invalid Date';

    setErrors({
      amount: !amountValid,
      description: !descriptionValid,
      date: !dateValid,
    });

    if (!amountValid || !descriptionValid || !dateValid) {
      return
    }

    onSubmit(newExpense);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          field="amount"
          isDangerous={errors.amount}
          changeHandler={changeHandler}
          textInputConfig={{
          keyboardType: 'decimal-pad',
            value: inputValues.amount,
        }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          field="date"
          isDangerous={errors.date}
          changeHandler={changeHandler}
          textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
            value: inputValues.date,
        }}
        />
      </View>
      <Input
        label="Description"
        field="description"
        changeHandler={changeHandler}
        isDangerous={errors.description}
        textInputConfig={{
        multiple: true,
          value: inputValues.description,
      }} />
      <View style={styles.buttonContainer}>
        <ButtonCustom style={styles.button} mode="flat" onPress={onCancel}>Cancel</ButtonCustom>
        <ButtonCustom
          style={styles.button}
          onPress={submitHandler}
        >
          {submitButtonLable}
        </ButtonCustom>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 80
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  }
});

export default ExpenseForm;
