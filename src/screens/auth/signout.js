import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert, Platform} from 'react-native';
import {signOut} from 'aws-amplify/auth';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

export default function SignOutButton() {
  const navigation = useNavigation();

  async function handleSignOut() {
    try {
      await signOut();
      navigation.navigate('login');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  function confirmSignOut() {
    if (Platform.OS === 'web') {
      const isConfirmed = window.confirm('Are you sure you want to sign out?');
      if (isConfirmed) {
        handleSignOut();
      }
    } else {
      Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes', onPress: handleSignOut}
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={confirmSignOut} style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
        <MaterialIcons name='logout' size={20} color='white' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  signOutButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B91C1C',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'space-between'
  },

  signOutText: {
    fontSize: 20,
    color: 'white',

    fontWeight: 'bold'
  }
});
