import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constents/styles";

const ExpensesOutput = ({ expenses, expensesPeriod, fallBack }) => {
  let content = <Text style={styles.infoText}> {fallBack} </Text>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  }
});

export default ExpensesOutput;
