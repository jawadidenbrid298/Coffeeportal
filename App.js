import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import AppNavigator from './src/navigation/AppNavigator';
import {Amplify} from 'aws-amplify';
import config from './src/amplifyconfiguration.json';
Amplify.configure(config);

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <RootNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default App;
