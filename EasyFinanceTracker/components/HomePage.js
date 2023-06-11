import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomePage = ({ navigation }) => {
    return (
        <View style={styles.homePageContainer}>
            <Text style={styles.homePageWelcomeText}>Welcome to EasyFinanceTracker!</Text>
            <Button 
                style={styles.homePageButton}
                title="Go to Account Summary" 
                onPress={() => navigation.navigate('AccountSummary')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    homePageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF', 
    },
    homePageWelcomeText: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Helvetica', 
        color: '#1D1E1F', 
    },
    homePageButton: {
        backgroundColor: '#1D1E1F', 
        color: '#FFFFFF', 
        padding: 10,
        borderRadius: 5,
    },
});

export default HomePage;
