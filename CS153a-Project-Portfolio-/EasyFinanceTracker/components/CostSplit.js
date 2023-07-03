import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TextInput, TouchableOpacity, Linking, Alert, Platform, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Notifications from 'expo-notifications';
import DatePicker from 'react-native-datepicker';
import { Icon } from 'react-native-elements';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Contact = ({ contact }) => {
  const phoneNumber = contact.phoneNumbers && contact.phoneNumbers[0] ? contact.phoneNumbers[0].number : 'No phone number';

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [notificationId, setNotificationId] = useState(null);
  const [reminderSet, setReminderSet] = useState(false);
  

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('No notification permissions!');
        return;
      }
    })();
  }, []);

  const sendMessage = () => {
    if (Linking.canOpenURL('sms:')) {
      Linking.openURL(`sms:${phoneNumber}`);
    } else {
      console.warn('This device is not capable of sending SMS messages.');
    }
  };

  const setReminder = async () => {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: `Remind to split cost with ${contact.name}`,
      },
      trigger: date,
    });
    setNotificationId(id);
    setReminderSet(true);
    setShow(false);
  };

  const cancelReminder = async () => {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      setNotificationId(null);
      setReminderSet(false);
      Alert.alert('Notification cancelled');
    } else {
      Alert.alert('No notification to cancel');
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handlePress = () => {
    if (!reminderSet) {
      Alert.alert(
        "Choose an action",
        "Would you like to send a message or set a reminder?",
        [
          { text: "Send Message", onPress: sendMessage },
          { text: "Set Reminder", onPress: showDatepicker },
          { text: "Cancel", style: "cancel" }
        ],
      );
    } else {
      Alert.alert(
        "Choose an action",
        "Would you like to send a message, reset a reminder, or cancel the current reminder?",
        [
          { text: "Send Message", onPress: sendMessage },
          { text: "Reset Reminder", onPress: showDatepicker },
          { text: "Cancel Reminder", onPress: cancelReminder },
          { text: "Cancel", style: "cancel" }
        ],
      );
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.contactCon}>
      <View style={styles.imgCon}>
        <View style={styles.placeholder}>
          <Text style={styles.txt}>{contact.name[0]}</Text>
        </View>
      </View>
      <View style={styles.contactDat}>
        <Text style={styles.name}>
          {contact.name}
        </Text>
        <Text style={styles.phoneNumber}>
          {phoneNumber}
        </Text>
        {reminderSet && (
          <Icon
            name="alarm"
            type="material"
            color="#00aced"
          />
        )}
      </View>
      {show && (
        <View>
         <DatePicker
          date={date}
          mode="datetime"
          format="YYYY-MM-DD HH:mm:ss"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(datetime) => {
            setDate(new Date(datetime));
          }}
        />
          <Button title="OK" onPress={setReminder}/>
        </View>
      )}
    </TouchableOpacity>
  );
        };

const CostSplit = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      } else {
        Alert.alert('Permission Denied', 'Contact permissions are required to use this app.');
      }
    })();
  }, []);

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const keyExtractor = (item, idx) => {
    return item.id || idx.toString();
  };

  const renderItem =({ item, index }) => {
    return <Contact contact={item} />;
  };

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar} 
        onChangeText={setSearch} 
        value={search} 
        placeholder="Search contacts..."
      />
    
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  list: {
    flex: 1,
  },
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: '#888',
  },
});

export default CostSplit;