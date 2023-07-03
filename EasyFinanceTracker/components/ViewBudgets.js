import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import { Card } from 'react-native-elements'; 

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
        Alert.alert(
          'Clear History',
          'Are you sure you want to clear the history?',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Yes', onPress: async () => {
              await AsyncStorage.clear();
              setTransactions([]);
            }},
          ],
          {cancelable: false}
        );
    } catch(e) {
        Alert.alert('Error', 'An error occurred while clearing the data.');
    }
  }

  return (
    <View style={styles.container}>
      
      {Object.entries(budgets).map(([category, budget]) => {
        const progress = calculateProgress(category);
        return (
          <Card key={category}>
            <Card.Title>{category}</Card.Title>
            <Card.Divider/>
            <Text style={styles.categoryText}>{category}: {budget}</Text>
            <Progress.Bar progress={progress} width={200} color={progress >= 1 ? 'red' : progress >= 0.5 ? 'yellow' : 'green'} />
            {progress >= 1 && <Text style={styles.warningText}>You have reached your budget limit.</Text>}
          </Card>
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
