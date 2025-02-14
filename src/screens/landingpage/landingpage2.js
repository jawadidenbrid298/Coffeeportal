import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const LandingPage2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Landing Page 2</Text>
      <Button title='Go to Landing Page 1' onPress={() => navigation.navigate('LandingPage1')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  }
});

export default LandingPage2;
