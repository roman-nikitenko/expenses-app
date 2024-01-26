import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import Loader from "../components/UI/Loader";
import ErrorUI from "../util/ErrorUI";

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState()
  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expensesFromServer = await fetchExpenses();
        setExpenses(expensesFromServer);

      } catch (error) {
        setError('Could not fetch expenses!');
      }

      setIsLoading(false);
    }

    getExpenses();
  }, []);

  const errorHandle = () => {
    setError(null);
  }

  if (error && !isLoading) {
    return <ErrorUI message={error} onConfirm={errorHandle} />
  }

  if (isLoading) {
    return <Loader />
  }

  const recentExpenses = expenses.filter((expense) => {
   const today = new Date();
   const date7DaysAgo = getDateMinusDays(today, 7);

   return (expense.date >= date7DaysAgo) && (expense.date <= today);
});




  return (
    <View>
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod="Last 7 days"
        fallBack="No expenses regostered"
      />
    </View>
  )
};

const styles = StyleSheet.create({});

export default RecentExpenses;
