import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


function calculateTotal(transactions) {
  return transactions.reduce((total, trans) => total + trans.amount, 0);
}

function calculateTotalsByCategory(transactions) {
  return transactions.reduce((totals, trans) => {
    if (totals[trans.category]) {
      totals[trans.category] += trans.amount;
    } else {
      totals[trans.category] = trans.amount;
    }
    return totals;
  }, {});
}

const CategoryItem = ({ category, amount, percentage }) => (
  <View key={category} style={styles.item}>
    <Text style={styles.text}>
      {category}: {amount} ({percentage}%)
    </Text>
  </View>
);

const Breakdown = ({ route }) => {
  const { transactions } = route.params;
  const total = calculateTotal(transactions);
  const totalsByCategory = calculateTotalsByCategory(transactions);

  return (
    <View style={styles.container}>
      {Object.keys(totalsByCategory).map((category) => {
        const amount = totalsByCategory[category];
        const percentage = (amount / total * 100).toFixed(2);
        return <CategoryItem key={category} category={category} amount={amount} percentage={percentage} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  item: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  text: {
    fontSize: 16,
    color: '#333333',
  },
});

export default Breakdown;
