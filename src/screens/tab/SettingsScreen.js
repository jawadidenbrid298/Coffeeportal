import {StyleSheet, Text, TextInput, View, TouchableOpacity, Animated, Easing, Alert} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {getCurrentUser} from 'aws-amplify/auth';
import {generateClient} from '@aws-amplify/api';
import {getUser} from '../../graphql/queries';
import {updateUser} from '../../graphql/mutations';
import {AntDesign} from '@expo/vector-icons';

const client = generateClient();

const SettingsScreen = () => {
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    phoneNumber: '',
    email: ''
  });

  const [isEditing, setIsEditing] = useState({
    name: false,
    phone: false
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {username} = await getCurrentUser();
        const {data} = await client.graphql({
          query: getUser,
          variables: {id: username}
        });

        if (data?.getUser) {
          setUserData({
            id: data.getUser.id,
            name: data.getUser.name || '',
            phoneNumber: data.getUser.phoneNumber || '',
            email: data.getUser.email || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleEditing = (key) => {
    setIsEditing((prev) => ({...prev, [key]: !prev[key]}));
  };

  const handleUpdate = async () => {
    try {
      const {data} = await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: userData.id,
            name: userData.name,
            phoneNumber: userData.phoneNumber
          }
        }
      });

      if (data?.updateUser) {
        Alert.alert('Success', 'Your profile has been updated!');
        setIsEditing({name: false, phone: false}); // Disable editing after update
      }
    } catch (error) {
      console.error('Error updating user:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Name Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder='Enter name'
            value={userData.name}
            onChangeText={(text) => setUserData({...userData, name: text})}
            editable={isEditing.name}
          />
          <TouchableOpacity onPress={() => toggleEditing('name')} style={styles.editIcon}>
            <AntDesign name={isEditing.name ? 'check' : 'edit'} size={20} color='gray' />
          </TouchableOpacity>
        </View>
      </View>

      {/* Phone Number Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder='Enter phone number'
            keyboardType='phone-pad'
            value={userData.phoneNumber}
            onChangeText={(text) => setUserData({...userData, phoneNumber: text})}
            editable={isEditing.phone}
          />
          <TouchableOpacity onPress={() => toggleEditing('phone')} style={styles.editIcon}>
            <AntDesign name={isEditing.phone ? 'check' : 'edit'} size={20} color='gray' />
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.button, !isEditing.name && !isEditing.phone && {opacity: 0.5}]}
        onPress={handleUpdate}
        disabled={!isEditing.name && !isEditing.phone}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#555',
    flex: 1
  },
  editIcon: {
    padding: 5,
    marginLeft: 10
  },
  button: {
    marginTop: 20,
    backgroundColor: '#C67C4E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
