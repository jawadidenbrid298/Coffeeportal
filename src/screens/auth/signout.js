import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {signOut} from 'aws-amplify/auth';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'; // Import the hook

export default function SignOutButton() {
  const navigation = useNavigation(); // Get navigation object

  async function handleSignOut() {
    try {
      await signOut();
      navigation.navigate('login');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  return (
    <TouchableOpacity onPress={handleSignOut} style={styles.dropdownItem}>
      <MaterialIcons name='logout' size={20} color='#800000' />
      <Text style={styles.dropdownText}>Sign Out</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dropdownItem: {flexDirection: 'row', alignItems: 'center', paddingVertical: 10},
  dropdownText: {fontSize: 16, color: '#800000', marginLeft: 10}
});
