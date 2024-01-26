import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import RenderExpensesItem from "../renderExpensesItem";

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <RenderExpensesItem item={item} /> }
    />
  )
};

const styles = StyleSheet.create({
});

export default ExpensesList;
