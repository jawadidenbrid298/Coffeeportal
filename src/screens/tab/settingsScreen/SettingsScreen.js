import {StyleSheet, Animated, Text, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {getCurrentUser, updatePassword} from 'aws-amplify/auth';
import {generateClient} from '@aws-amplify/api';
import {getUsers} from '../../../graphql/queries';
import {updateUsers} from '../../../graphql/mutations';
import {AntDesign, Feather} from '@expo/vector-icons';
import SignOutButton from '../../auth/signout';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../components/shared/CustomButton';
import {styles} from './SettingsScreenStyle';
const client = generateClient();

const SettingsScreen = () => {
  const [userData, setUserData] = useState({id: '', name: '', phoneNumber: '', email: ''});
  const [passwords, setPasswords] = useState({oldPassword: '', newPassword: ''});
  const [expandedSection, setExpandedSection] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const nameInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {username} = await getCurrentUser();
        const {data} = await client.graphql({
          query: getUsers,
          variables: {id: username}
        });

        if (data?.getUsers) {
          setUserData({
            id: data.getUsers.id,
            name: data.getUsers.name || '',
            phoneNumber: data.getUsers.phoneNumber || '',
            email: data.getUsers.email || ''
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleSection = (section) => {
    setExpandedSection((prev) => (prev === section ? null : section));
    setEditingField(null);
  };

  const enableEditing = (field) => {
    setEditingField(field);
    setTimeout(() => {
      if (field === 'name' && nameInputRef.current) {
        nameInputRef.current.focus();
      } else if (field === 'phone' && phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
    }, 100);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }).start(() => setSuccessMessage(''));
      }, 2000);
    });
  };

  const handleUpdate = async () => {
    try {
      const {data} = await client.graphql({
        query: updateUsers, // Using updateUsers instead of updateUser
        variables: {
          input: {
            id: userData.id,
            name: userData.name,
            phoneNumber: userData.phoneNumber
          }
        }
      });

      if (data?.updateUsers) {
        showSuccessMessage('Profile updated successfully!');
        setExpandedSection(null);
        setEditingField(null);
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
      <TouchableOpacity onPress={() => navigation.navigate('landingpage')} style={styles.backButton}>
        <AntDesign name='arrowleft' size={24} color='black' />
      </TouchableOpacity>

      <View style={styles.header}>
        <AntDesign name='setting' size={24} color='black' style={{marginRight: 8}} />
        <Text style={styles.headerText}>Settings</Text>
      </View>

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
        <View style={styles.dropdownContainer}>
          <View style={styles.inputRow}>
            <TextInput
              ref={nameInputRef}
              style={styles.input}
              placeholder='Enter name'
              value={userData.name}
              onChangeText={(text) => setUserData({...userData, name: text})}
              editable={editingField === 'name'}
            />
            <TouchableOpacity onPress={() => enableEditing('name')}>
              <Feather name='edit-2' size={18} color='gray' />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Phone Number Section */}
      <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('phone')}>
        <Text style={styles.label}>Phone Number</Text>
        <AntDesign name={expandedSection === 'phone' ? 'up' : 'down'} size={20} color='gray' />
      </TouchableOpacity>

      {expandedSection === 'phone' && (
        <View style={styles.dropdownContainer}>
          <View style={styles.inputRow}>
            <TextInput
              ref={phoneInputRef}
              style={styles.input}
              placeholder='Enter phone number'
              keyboardType='phone-pad'
              value={userData.phoneNumber}
              onChangeText={(text) => setUserData({...userData, phoneNumber: text})}
              editable={editingField === 'phone'}
            />
            <TouchableOpacity onPress={() => enableEditing('phone')}>
              <Feather name='edit-2' size={18} color='gray' />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Change Password Section */}
      <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('password')}>
        <Text style={styles.label}>Change Password</Text>
        <AntDesign name={expandedSection === 'password' ? 'up' : 'down'} size={20} color='gray' />
      </TouchableOpacity>

      {expandedSection === 'password' && (
        <View style={styles.dropdownContainer}>
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
          <CustomButton title='Update Password' onPress={handleUpdatePassword} />
        </View>
      )}

      {editingField && expandedSection && <CustomButton title='Save Changes' onPress={handleUpdate} />}

      <SignOutButton />
    </View>
  );
};

export default SettingsScreen;
