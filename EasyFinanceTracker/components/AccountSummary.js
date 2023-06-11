import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AccountSummary = ({ navigation }) => {
const [transactions, setTransactions] = useState([]);

const balance = transactions.reduce((total, trans) => total + trans.amount, 0);

return (
  <View style={styles.container}>
    <Text style={styles.balance}>Account Balance: ${balance}</Text>
    <View style={styles.buttonContainer}>
      <Button
        title="Add Transaction"
        onPress={() => navigation.navigate('Transaction', { transactions, setTransactions })}
      />
      <Button
        title="View Breakdown"
        onPress={() => navigation.navigate('Breakdown', { transactions })}
      />
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
},
  balance: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
},
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
},
});

export default AccountSummary;