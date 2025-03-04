import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Alert, Platform, ActivityIndicator} from 'react-native';
import {signOut} from 'aws-amplify/auth';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {styles} from './signoutStyles';

export default function SignOutButton() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOut();
      navigation.navigate('login');
    } catch (error) {
      console.log('Error signing out: ', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function confirmSignOut() {
    if (Platform.OS === 'web') {
      const isConfirmed = window.confirm('Are you sure you want to sign out?');
      if (isConfirmed) {
        handleSignOut();
      }
    } else {
      Alert.alert(
        'Sign Out',
        loading ? 'Signing out...' : 'Are you sure you want to sign out?',
        loading
          ? []
          : [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Yes', onPress: handleSignOut}
            ],
        {cancelable: false}
      );
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={confirmSignOut} style={styles.signOutButton} disabled={loading}>
        {loading ? (
          <ActivityIndicator size='small' color='white' />
        ) : (
          <>
            <Text style={styles.signOutText}>Sign Out</Text>
            <MaterialIcons name='logout' size={20} color='white' />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
