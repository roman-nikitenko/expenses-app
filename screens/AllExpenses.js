import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);

  return (
    <View>
      <ExpensesOutput
        expenses={expenses}
        expensesPeriod="Total"
        fallBack="No expenses registered"
      />
    </View>
  )
};

const styles = StyleSheet.create({});

export default AllExpenses;
