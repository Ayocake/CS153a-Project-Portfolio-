import React, { useState, useEffect } from 'react';
import { ScrollView, Modal, Button, View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useIsFocused } from '@react-navigation/native';

const TransactionHistory = ({ navigation }) => {
    const [transactions, setTransactions] = useState([]);
    const [isImageViewVisible, setIsImageViewVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
     const isFocused = useIsFocused();

    useEffect(() => {
        const getTransactions = async () => {
          try {
            const jsonValue = await AsyncStorage.getItem('@transaction_history');
            if (jsonValue !== null) {
              let transactions = JSON.parse(jsonValue);
              transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
              setTransactions(transactions);
            }
          } catch (e) {
            console.log("error in getTransactions ", e);
          }
        };
        getTransactions();
      }, [isFocused]);


      const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.setItem('@transaction_history', JSON.stringify([]));
        } catch(e) {
          console.log("error in clearData ", e);
        }
      }
  
      const deleteItem = async (index) => {
        try {
          let newTransactions = [...transactions];
          newTransactions.splice(index, 1);
          await AsyncStorage.setItem('@transaction_history', JSON.stringify(newTransactions));
          setTransactions(newTransactions);
        } catch(e) {
          console.log("error in deleteItem ", e);
        }
      }

    const renderTransactionHistory = ({item, index}) => {
        return (
            <View style={styles.transactionItem}>
                <Text style={styles.transactionAmount}>${item.amount}</Text>
                <Text style={styles.transactionDescription}>{item.description}</Text>
                <Text style={styles.transactionCategory}>{item.category}</Text>
    
                <TouchableOpacity onPress={() => {
                    setCurrentImageIndex(index);
                    setIsImageViewVisible(true);
                }}>
                {item.photoUri && <Image source={{ uri: item.photoUri }} style={styles.transactionImage} />}
                </TouchableOpacity>
                </View>
        )
    }

    const images = transactions.map(transaction => ({ url: transaction.photoUri }));

    return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Transaction History</Text>
          
          <Button
            title="Clear History"
            color="#f04a5c"
            onPress={clearAll}
            style={styles.clearButton}
          />
      
          <SwipeListView
            data={transactions}
            renderItem={(data, rowMap) => renderTransactionHistory({...data, index: transactions.length - 1 - data.index})}
            renderHiddenItem={ (data, rowMap) => (
              <View style={styles.rowBack}>

                <TouchableOpacity
                  style={styles.backRightBtn}
                  onPress={_ => deleteItem(transactions.length - 1 - data.index)}
                >
                  <Text style={styles.backTextWhite}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-75}
          />
      
          <Modal visible={isImageViewVisible} transparent={true}>
            <ImageViewer imageUrls={images} index={currentImageIndex} onSwipeDown={() => setIsImageViewVisible(false)} enableSwipeDown={true} />
          </Modal>
        </ScrollView>
      );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 15
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#212121',
      marginBottom: 20,
      textAlign: 'center'
    },
    clearButton: {
      marginBottom: 20,
    },
    transactionItem: {
      backgroundColor: '#F3F3F3',
      padding: 20,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      elevation: 2,
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
    transactionImage: {
      width: 50, 
      height: 50, 
      borderRadius: 25,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        right: 0,
        backgroundColor: 'red',
    },
    backTextWhite: {
        color: '#FFF',
    },
  });

export default TransactionHistory;