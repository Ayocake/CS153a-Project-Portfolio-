import React, { useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryPicker from '../lib/CategoryPicker';

const Transaction = ({ route, navigation }) => {
  const { transactions, updateTransactions } = route.params;
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleTransactionSubmit = async () => {
    try {
      const newTransaction = { amount, description, category };
      const updatedTransactions = [...transactions, newTransaction];
      await AsyncStorage.setItem('@transaction_history', JSON.stringify(updatedTransactions));
      updateTransactions(updatedTransactions); 
      navigation.goBack(); 
    } catch(e) {
      console.log("error in handleTransactionSubmit")
      console.dir(e);
    }
  
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

      <Text style={styles.label}>Select Transaction Category:</Text>
      <CategoryPicker onCategoryChange={setCategory} />

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
    backgroundColor: '#003b71',  
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
