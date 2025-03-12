import {StyleSheet, Animated, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {getCurrentUser, updatePassword, fetchUserAttributes, fetchAuthSession} from 'aws-amplify/auth';
import {generateClient} from '@aws-amplify/api';
import {getUsers} from '../../../graphql/queries';
import {updateUsers} from '../../../graphql/mutations';
import {AntDesign} from '@expo/vector-icons';
import SignOutButton from '../../auth/signout/signout';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../../../components/shared/CustomButton';
import Toast from 'react-native-toast-message';
import MyField from '../../../components/shared/MyField';
import {styles} from './SettingsScreenStyle';
import {updateUserAttributes} from 'aws-amplify/auth';

const client = generateClient();

const SettingsScreen = () => {
  const route = useRoute();

  const [userData, setUserData] = useState(route.params?.userData || null);
  const [passwords, setPasswords] = useState({oldPassword: '', newPassword: ''});
  const [expandedSection, setExpandedSection] = useState(null);
  const profileAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const [initialUserData, setInitialUserData] = useState(null);

  useEffect(() => {
    if (!initialUserData && userData) {
      setInitialUserData(userData);
    }
  }, [userData]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserAttributes();
        console.log('Fetched user:', user);

        if (!user) {
          navigation.reset({index: 0, routes: [{name: 'login'}]});
          return;
        }

        // const response = await client.graphql({
        //   query: getUsers,
        //   variables: {id: user.userId || user.attributes?.sub}
        // });

        // setUserData(response.data.getUsers);

        const code = user['custom:countryCode'];
        setCallingCode(code);
      } catch (error) {
        console.error('Error fetching user:', error);
        navigation.reset({index: 0, routes: [{name: 'login'}]});
      }
    };

    fetchUser();
  }, []);

  const toggleSection = (section) => {
    const animation = section === 'profile' ? profileAnim : passwordAnim;
    const otherAnimation = section === 'profile' ? passwordAnim : profileAnim;

    if (expandedSection === section) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start(() => setExpandedSection(null));
    } else {
      Animated.timing(otherAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start(() => {
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
    if (!userData || !initialUserData) return;

    setIsUpdatingUser(true);
    try {
      const combinedPhoneNumber = `+${callingCode}${userData.phoneNumber.replace(/\D/g, '')}`;

      const updatedFields = {};

      if (userData.name.trim() !== initialUserData.name.trim()) {
        updatedFields.name = userData.name;
      }
      if (userData.email.trim() !== initialUserData.email.trim()) {
        updatedFields.email = userData.email;
      }
      if (userData.phoneNumber.trim() !== initialUserData.phoneNumber.trim()) {
        updatedFields.phone_number = combinedPhoneNumber;
        updatedFields['custom:phoneNumber'] = combinedPhoneNumber;
        updatedFields['custom:countryCode'] = `+${callingCode}`;
      }

      if (Object.keys(updatedFields).length === 0) {
        Toast.show({type: 'info', text1: 'No changes detected'});
        setIsUpdatingUser(false);
        return;
      }

      await updateUserAttributes({userAttributes: updatedFields});

      await client.graphql({
        query: updateUsers,
        variables: {
          input: {
            id: userData.id,
            ...updatedFields
          }
        }
      });

      Toast.show({type: 'success', text1: 'Profile updated successfully!'});

      const updatedUser = await getCurrentUser();
      console.log('Updated User Attributes:', updatedUser);

      setInitialUserData(userData);
    } catch (error) {
      console.error('Error updating user:', error);
      Toast.show({type: 'error', text1: 'Update Failed', text2: error?.message || 'Failed to update profile.'});
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
              height: profileAnim.interpolate({inputRange: [0, 1], outputRange: [0, 370]}),
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
                value={userData.phoneNumber}
                onChange={(text) => setUserData({...userData, phoneNumber: text})}
                keyboardType='phone-pad'
                isPhoneField
                countryCode={countryCode}
                callingCode={callingCode}
                onCountryChange={(newCode) => {
                  setCountryCode(newCode);
                }}
                onCallingCodeChange={(newCallingCode) => setCallingCode(newCallingCode)}
              />
              <MyField
                label='Email'
                placeholder='Enter email'
                value={userData.email}
                onChange={(text) => setUserData({...userData, email: text})}
                icon='email-outline'
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
