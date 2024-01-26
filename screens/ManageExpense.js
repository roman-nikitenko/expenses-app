import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constents/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import { deleteExpensesHttp, storeExpense, updateExpense } from "../util/http";
import Loader from "../components/UI/Loader";
import ErrorUI from "../util/ErrorUI";

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { updateExpenses, deleteExpenses, addExpenses, expenses } = useContext(ExpensesContext);

  const selectedExpens = expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    try {
      await deleteExpensesHttp(editedExpenseId);
      deleteExpenses(editedExpenseId);

      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      setError('Could not delete expense - please try again later')
    }
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

   const confirmHandler = async (expenseData) => {
     setIsLoading(true);
     try {
       if (isEditing) {
         updateExpenses(editedExpenseId, expenseData);
         await updateExpense(editedExpenseId ,expenseData)
       } else {
         const id = await storeExpense(expenseData);
         addExpenses({ ...expenseData, id: id })
       }
       navigation.goBack();
     } catch (error) {
       setError('Could not save date - plase try later!')
       setIsLoading(false);
     }
  }

  const errorHandler = () => {
    setError(null)
  }

  if (error && !isLoading) {
    return <ErrorUI message={error} onConfirm={errorHandler} />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLable={isEditing ? 'Update' : 'Add'}
        defaultValue={selectedExpens}
      />
      {isEditing &&
        <View style={styles.deleteContainer}>
        <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
        </View>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpense;
