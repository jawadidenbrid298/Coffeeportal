import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';


export default function AccountSuccess({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successContainer}>
          <CheckIcon />
        </View>
        <View>
          <Text style={styles.title}>Account created</Text>
          <Text style={styles.subtitle}>
            Account created successfully, you can{'\n'}
            login again with a Email and password
          </Text>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(20, 123 ,114 ,1)',
    justifyContent: 'center'
  },
  content: {
    padding: 24,
    flexDirection: 'column',
    gap: 40
  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20
  },
  loginButton: {
    backgroundColor: 'rgba(25, 154, 142, 1)',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  loginButtonText: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 16,
    fontWeight: '400'
  }
});
