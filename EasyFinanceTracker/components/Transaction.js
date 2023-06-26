import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryPicker from '../lib/CategoryPicker';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

const Transaction = ({ route, navigation }) => {
  const { transactions, updateTransactions } = route.params;
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [photoUri, setPhotoUri] = useState('');

  const handleTransactionSubmit = async () => {
    try {
      const newTransaction = { amount, description, category, date, photoUri };
      const updatedTransactions = [...transactions, newTransaction];
      await AsyncStorage.setItem('@transaction_history', JSON.stringify(updatedTransactions));
      updateTransactions(updatedTransactions); 
      navigation.goBack(); 
    } catch(e) {
      console.log("error in handleTransactionSubmit");
      console.dir(e);
    }
  };

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }
  
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setPhotoUri(result.uri);
    }
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
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
  
      <Text style={styles.label}>Select Transaction Date:</Text>
      <DatePicker
        style={styles.datePicker}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2000-05-01"
        maxDate="2030-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            tintColor: '#0079CF',
          },
          dateInput: {
            marginLeft: 36,
            borderColor: '#0079CF',
            backgroundColor: '#F3F3F3',
          }
        }}
        onDateChange={(date) => {setDate(date)}}
      />
  
      <TouchableOpacity 
        style={styles.photoButton}
        onPress={takePhoto}
      >
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.photoButton}
        onPress={pickImage}
      >
        <Text style={styles.buttonText}>Choose Photo</Text>
      </TouchableOpacity>
  
      {photoUri && <Image source={{ uri: photoUri }} style={styles.transactionImage} />}
  
      <TouchableOpacity 
        style={styles.button}
        onPress={handleTransactionSubmit}
      >
        <Text style={styles.buttonText}>Submit Transaction</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    height: 40,
    borderColor: '#A6A6A6',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#F3F3F3',
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#212121',
  },
  photoButton: {
    backgroundColor: '#0079CF',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0079CF',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  }
});

export default Transaction;
