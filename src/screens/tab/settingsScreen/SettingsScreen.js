import {StyleSheet, Animated, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {getCurrentUser, updatePassword} from 'aws-amplify/auth';
import {generateClient} from '@aws-amplify/api';
import {getUsers} from '../../../graphql/queries';
import {updateUsers} from '../../../graphql/mutations';
import {AntDesign} from '@expo/vector-icons';
import SignOutButton from '../../auth/signout';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../components/shared/CustomButton';
import Toast from 'react-native-toast-message';
import MyField from '../../../components/shared/MyField';
import {styles} from './SettingsScreenStyle';

const client = generateClient();

const SettingsScreen = () => {
  const [userData, setUserData] = useState({id: '', name: '', phoneNumber: '', email: ''});
  const [passwords, setPasswords] = useState({oldPassword: '', newPassword: ''});
  const [expandedSection, setExpandedSection] = useState(null);
  const profileAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Loading states
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

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
    const animation = section === 'profile' ? profileAnim : passwordAnim;
    const otherAnimation = section === 'profile' ? passwordAnim : profileAnim;

    if (expandedSection === section) {
      // Close the currently opened section
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start(() => setExpandedSection(null));
    } else {
      // Close the other section first
      Animated.timing(otherAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start(() => {
        // Expand the new section
        setExpandedSection(section);
        Animated.timing(animation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false
        }).start();
      });
    }
  };

  const handleUpdateUser = async () => {
    setIsUpdatingUser(true);
    try {
      const input = {id: userData.id, name: userData.name, phoneNumber: userData.phoneNumber};
      await client.graphql({query: updateUsers, variables: {input}});
      Toast.show({type: 'success', text1: 'Profile updated successfully!'});
    } catch (error) {
      console.error('Error updating user:', error);
      Toast.show({type: 'error', text1: 'Failed to update profile.'});
    } finally {
      setIsUpdatingUser(false);
    }
  };

  const handleUpdatePassword = async () => {
    setIsUpdatingPassword(true);
    try {
      if (!passwords.oldPassword || !passwords.newPassword) {
        Toast.show({type: 'error', text1: 'Please enter both old and new passwords.'});
        return;
      }
      await updatePassword({oldPassword: passwords.oldPassword, newPassword: passwords.newPassword});
      Toast.show({type: 'success', text1: 'Password updated successfully!'});
      setExpandedSection(null);
      setPasswords({oldPassword: '', newPassword: ''});
    } catch (err) {
      console.error('Error updating password:', err);
      Toast.show({type: 'error', text1: 'Failed to update password.'});
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('landingpage')} style={styles.backButton}>
          <AntDesign name='arrowleft' size={24} color='black' />
        </TouchableOpacity>

        <View style={styles.header}>
          <AntDesign name='setting' size={24} color='black' style={{marginRight: 8}} />
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('profile')}>
            <Text style={styles.label}>Profile</Text>
            <AntDesign name={expandedSection === 'profile' ? 'up' : 'down'} size={20} color='gray' />
          </TouchableOpacity>
          <Animated.View
            style={{
              height: profileAnim.interpolate({inputRange: [0, 1], outputRange: [0, 270]}),
              overflow: 'hidden'
            }}>
            <View style={styles.dropdownContainer}>
              <MyField
                label='Name'
                placeholder='Enter name'
                value={userData.name}
                onChange={(text) => setUserData({...userData, name: text})}
                icon='account-outline'
              />

              <MyField
                label='Phone Number'
                placeholder='Enter phone number'
                keyboardType='phone-pad'
                value={userData.phoneNumber}
                onChange={(text) => setUserData({...userData, phoneNumber: text})}
                icon='phone-outline'
              />

              <CustomButton title='Save Changes' onPress={handleUpdateUser} isLoading={isUpdatingUser} />
            </View>
          </Animated.View>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.sectionHeader} onPress={() => toggleSection('password')}>
            <Text style={styles.label}>Change Password</Text>
            <AntDesign name={expandedSection === 'password' ? 'up' : 'down'} size={20} color='gray' />
          </TouchableOpacity>
          <Animated.View
            style={{
              height: passwordAnim.interpolate({inputRange: [0, 1], outputRange: [0, 270]}),
              overflow: 'hidden'
            }}>
            <View style={styles.dropdownContainer}>
              <MyField
                label='Old Password'
                placeholder='Old Password'
                secureTextEntry
                value={passwords.oldPassword}
                onChange={(text) => setPasswords({...passwords, oldPassword: text})}
                icon='lock-outline'
              />

              <MyField
                label='New Password'
                placeholder='New Password'
                secureTextEntry
                value={passwords.newPassword}
                onChange={(text) => setPasswords({...passwords, newPassword: text})}
                icon='lock-check-outline'
              />

              <CustomButton title='Update Password' onPress={handleUpdatePassword} isLoading={isUpdatingPassword} />
            </View>
          </Animated.View>
        </View>

        <SignOutButton />
        <Toast />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
