import {StyleSheet, Alert, Text, TextInput, View, TouchableOpacity, Animated, Platform} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {getCurrentUser, updatePassword} from 'aws-amplify/auth';
import {generateClient} from '@aws-amplify/api';
import {getUser} from '../../../graphql/queries';
import {updateUser} from '../../../graphql/mutations';
import {AntDesign} from '@expo/vector-icons';
import {styles} from './SettingsScreenStyle';
import SignOutButton from '../../auth/signout';

const client = generateClient();

const SettingsScreen = () => {
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    phoneNumber: '',
    email: ''
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const [expandedSection, setExpandedSection] = useState(null); // Track open section
  const [successMessage, setSuccessMessage] = useState('');

  // Animation for success message
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section)); // Toggle open/close
  };

  // Function to show the animated success message
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);

    Animated.timing(fadeAnim, {
      toValue: 1, // Fully visible
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade out
          duration: 300,
          useNativeDriver: true
        }).start(() => setSuccessMessage(''));
      }, 2000);
    });
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
        showSuccessMessage('Profile updated successfully!');
        setExpandedSection(null);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showSuccessMessage('Failed to update profile.');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      if (!passwords.oldPassword || !passwords.newPassword) {
        showSuccessMessage('Please enter both old and new passwords.');
        return;
      }

      await updatePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      });

      showSuccessMessage('Password updated successfully!');
      setExpandedSection(null);
      setPasswords({oldPassword: '', newPassword: ''});
    } catch (err) {
      console.error('Error updating password:', err);
      showSuccessMessage('Failed to update password.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Animated Success Message */}
      {successMessage ? (
        <Animated.View style={[styles.successMessage, {opacity: fadeAnim}]}>
          <Text style={styles.successText}>{successMessage}</Text>
        </Animated.View>
      ) : null}

      {/* Name Section */}
      <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('name')}>
        <Text style={styles.label}>Name</Text>
        <AntDesign name={expandedSection === 'name' ? 'up' : 'down'} size={20} color='gray' />
      </TouchableOpacity>
      {expandedSection === 'name' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Enter name'
            value={userData.name}
            onChangeText={(text) => setUserData({...userData, name: text})}
          />
        </View>
      )}

      {/* Phone Number Section */}
      <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('phone')}>
        <Text style={styles.label}>Phone Number</Text>
        <AntDesign name={expandedSection === 'phone' ? 'up' : 'down'} size={20} color='gray' />
      </TouchableOpacity>
      {expandedSection === 'phone' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Enter phone number'
            keyboardType='phone-pad'
            value={userData.phoneNumber}
            onChangeText={(text) => setUserData({...userData, phoneNumber: text})}
          />
        </View>
      )}

      {/* Change Password Section */}
      <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('password')}>
        <Text style={styles.label}>Change Password</Text>
        <AntDesign name={expandedSection === 'password' ? 'up' : 'down'} size={20} color='gray' />
      </TouchableOpacity>
      {expandedSection === 'password' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Old Password'
            secureTextEntry
            value={passwords.oldPassword}
            onChangeText={(text) => setPasswords({...passwords, oldPassword: text})}
          />
          <TextInput
            style={styles.input}
            placeholder='New Password'
            secureTextEntry
            value={passwords.newPassword}
            onChangeText={(text) => setPasswords({...passwords, newPassword: text})}
          />
        </View>
      )}

      {/* Save Button */}
      {expandedSection !== null && expandedSection !== 'password' && (
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      {/* Update Password Button */}
      {expandedSection === 'password' && (
        <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
          <Text style={styles.buttonText}>Update Password</Text>
        </TouchableOpacity>
      )}
      {/* Sign Out Button */}
      <SignOutButton />
    </View>
  );
};

export default SettingsScreen;
