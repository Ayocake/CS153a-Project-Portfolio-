import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';

const Transaction = ({ route, navigation }) => {
  const {transactions, setTransactions} = route.params;
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleTransactionSubmit = () => {
    const newTransaction = { amount: Number(amount), description, category };
    setTransactions([...transactions, newTransaction]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Transaction Amount:</Text>
      <TextInput 
        keyboardType="numeric" 
        onChangeText={setAmount}
        value={amount}
        style={styles.input}
      />

      <Text style={styles.label}>Enter Transaction Description:</Text>
      <TextInput 
        onChangeText={setDescription}
        value={description}
        style={styles.input}
      />

      <Text style={styles.label}>Enter Transaction Category:</Text>
      <TextInput 
        onChangeText={setCategory}
        value={category}
        style={styles.input}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={handleTransactionSubmit}
      >
        <Text style={styles.buttonText}>Submit Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    paddingLeft: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#212121',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default Transaction;
