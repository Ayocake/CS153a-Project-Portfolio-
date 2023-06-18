import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryPicker from '../lib/CategoryPicker';

const SetBudgets = () => {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = () => {
    AsyncStorage.getItem('@category_budgets')
      .then((value) => {
        const budgets = value !== null ? JSON.parse(value) : {};
        budgets[category] = parseInt(budget, 10);
        AsyncStorage.setItem('@category_budgets', JSON.stringify(budgets));
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Category:</Text>
      <CategoryPicker onCategoryChange={setCategory} />
      <Text style={styles.label}>Budget:</Text>
      <TextInput style={styles.input} onChangeText={text => setBudget(text)} value={budget} keyboardType='numeric' />
      <Button title="Set Budget" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#1d1d1d',
  },
  input: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default SetBudgets;
