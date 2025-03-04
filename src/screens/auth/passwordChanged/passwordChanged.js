import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {styles} from './styles';

export default function PasswordChanged({navigation}) {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Initial scale: 0

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successContainer}>
          <Animated.View style={[styles.iconBorder, {transform: [{scale: scaleAnim}]}]}>
            <MaterialIcons name='check-circle' size={200} color='#4CAF50' />
          </Animated.View>
        </View>
        <View>
          <Text style={styles.title}>Password Changed</Text>
          <Text style={styles.subtitle}>
            Password changed successfully, you can{'\n'}
            log in again with your new password.
          </Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('login')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
