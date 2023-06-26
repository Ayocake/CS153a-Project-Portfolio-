import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './components/HomePage';
import Transaction from './components/Transaction';
import Breakdown from './components/Breakdown';
import AccountSummary from './components/AccountSummary';
import TransactionHistory from './components/TransactionHistory';
import SetBudgets from './components/SetBudgets';
import ViewBudgets from './components/ViewBudgets';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="AccountSummary" component={AccountSummary} />
        <Stack.Screen name="Transaction" component={Transaction} />
        <Stack.Screen name="Breakdown" component={Breakdown} />
        <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
        <Stack.Screen name="SetBudgets" component={SetBudgets} />
        <Stack.Screen name="ViewBudgets" component={ViewBudgets} />
      </Stack.Navigator>
    </NavigationContainer>



  );
}

export default App;
