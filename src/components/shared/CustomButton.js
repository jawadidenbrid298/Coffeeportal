import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ActivityIndicator} from 'react-native';

const CustomButton = ({title, onPress, disabled, isLoading}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {opacity: disabled || isLoading ? 0.6 : 1}]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#65100D',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default CustomButton;
