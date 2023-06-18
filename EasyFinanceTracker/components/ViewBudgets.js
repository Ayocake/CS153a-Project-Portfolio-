import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

const ViewBudgets = () => {
  const [budgets, setBudgets] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('@category_budgets')
      .then((value) => {
        if (value !== null) {
          setBudgets(JSON.parse(value));
        }
      });

    AsyncStorage.getItem('@transaction_history')
      .then((value) => {
        if (value !== null) {
          setTransactions(JSON.parse(value));
        }
      });
  }, []);

  const calculateProgress = (category) => {
    const transactionsForCategory = transactions.filter(transaction => transaction.category === category);
    const totalSpent = transactionsForCategory.reduce((total, transaction) => total + Number(transaction.amount), 0);
    const budgetForCategory = budgets[category];
    return totalSpent / budgetForCategory;
  };

  const clearAll = async () => {
    try {
        console.log('in clearData')
        await AsyncStorage.clear();
        setTransactions([]);
    } catch(e) {
        console.log("error in clearData ")
        console.dir(e)
    }
}

  return (
    <View style={styles.container}>
      {Object.entries(budgets).map(([category, budget]) => {
        const progress = calculateProgress(category);
        return (
          <View key={category} style={styles.item}>
            <Text style={styles.categoryText}>{category}: {budget}</Text>
            <Progress.Bar progress={progress} width={200} />
            {progress >= 1 && <Text style={styles.warningText}>You have reached your budget limit.</Text>}
          </View>
        );
      })}
      <Button
        title="Clear History"
        color="#f04a5c"
        onPress={clearAll}
        style={styles.clearButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  item: {
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 18,
    marginBottom: 5,
    color: '#1d1d1d',
  },
  warningText: {
    marginTop: 5,
    color: 'red',
  },
  clearButton: {
    marginTop: 20,
  },
});

export default ViewBudgets;
