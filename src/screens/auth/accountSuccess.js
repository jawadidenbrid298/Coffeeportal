import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function AccountSuccess({navigation}) {
  const scaleAnim = useRef(new Animated.Value(0)).current; // Initial scale of 0

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
          <Text style={styles.title}>Account Created</Text>
          <Text style={styles.subtitle}>
            Account created successfully, you can{'\n'}
            log in again with your Email and password.
          </Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('login')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  content: {
    padding: 24,
    flexDirection: 'column',
    gap: 40,
    alignItems: 'center'
  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBorder: {
    borderWidth: 4,
    borderColor: '#4CAF50',
    borderRadius: 40,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#444',
    marginBottom: 12,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20
  },
  loginButton: {
    backgroundColor: '#C67C4E',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%'
  },
  loginButtonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    fontWeight: '400'
  }
});
