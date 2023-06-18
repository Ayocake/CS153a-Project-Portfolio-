import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Card,  Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountSummary = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getData = async () => {
        try {
            const transactionsJson = await AsyncStorage.getItem('@transaction_history');
            if (transactionsJson !== null) {
                setTransactions(JSON.parse(transactionsJson));
            }
        } catch (e) {
            console.log("error in getData")
            console.dir(e)
        }
    };
    getData();
  }, []);

  useEffect(() => {
    const totalBalance = transactions.reduce((total, trans) => total + Number(trans.amount), 0);
    setBalance(totalBalance);
    AsyncStorage.setItem('@account_balance', JSON.stringify(totalBalance));
  }, [transactions]);

  const resetBalance = async () => {
    setTransactions([]);
    await AsyncStorage.setItem('@transaction_history', JSON.stringify([]));
    await AsyncStorage.setItem('@account_balance', JSON.stringify(0));
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title h3>Account Summary</Card.Title>
        <Card.Divider/>
        <Text style={styles.balanceText}>Account Balance: ${balance}</Text>
        <View style={styles.buttonContainer}>
          <Button
            icon={
              <Icon
                name="add"
                size={15}
                color="white"
              />
            }
            title="Add Transaction"
            onPress={() => navigation.navigate('Transaction', { transactions, setTransactions, updateTransactions: (newTransactions) => setTransactions(newTransactions) })}
          />
          <Button
            icon={
              <Icon
                name="pie-chart"
                size={15}
                color="white"
              />
            }
            title="View Breakdown"
            onPress={() => navigation.navigate('Breakdown', { transactions })}
          />
          <Button
            icon={
              <Icon
                name="history"
                size={15}
                color="white"
              />
            }
            title="View Transaction History"
            onPress={() => navigation.navigate('TransactionHistory', { transactions })}
          />
          <Button
            icon={
              <Icon
                name="edit"
                size={15}
                color="white"
              />
            }
            title="Set Budget"
            onPress={() => navigation.navigate('SetBudgets')}
          />
          <Button
            icon={
              <Icon
                name="eye"
                size={15}
                color="white"
              />
            }
            title="View Budgets"
            onPress={() => navigation.navigate('ViewBudgets')}
          />
          <Button
            icon={
              <Icon
                name="delete"
                size={15}
                color="white"
              />
            }
            title="Reset Balance"
            onPress={resetBalance}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  card: {
    borderRadius: 10,
  },
  balanceText: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#1d1d1d',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default AccountSummary;
