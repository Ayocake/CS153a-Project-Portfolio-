import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionHistory = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
        const getTransactions = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@transaction_history');
                if (jsonValue !== null) {
                    setTransactions(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.log("error in getTransactions ")
                console.dir(e)
            }
        };
        getTransactions();
    }, []);
  
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

    const renderTransactionHistory = ({item, index}) => {
        return (
            <View style={styles.transactionItem}>
                <Text style={styles.transactionAmount}>${item.amount}</Text>
                <Text style={styles.transactionDescription}>{item.description}</Text>
                <Text style={styles.transactionCategory}>{item.category}</Text>
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transaction History</Text>

            <Button
                title="Clear History"
                color="#f04a5c"
                onPress={clearAll}
                style={styles.clearButton}
            />

            <FlatList
                data={transactions.reverse()}
                renderItem={renderTransactionHistory}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center'
    },
    transactionItem: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    transactionAmount: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333'
    },
    transactionDescription: {
        fontSize: 16,
        color: '#666'
    },
    transactionCategory: {
        fontSize: 14,
        color: '#999'
    },
    clearButton: {
        marginVertical: 20
    }
});

export default TransactionHistory;
