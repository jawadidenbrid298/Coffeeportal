import React, {useState, useEffect} from 'react';
import {StatusBar, View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';
import {Amplify} from 'aws-amplify';
import config from './src/amplifyconfiguration.json';
import {useFonts, NunitoSans_400Regular, NunitoSans_700Bold} from '@expo-google-fonts/nunito-sans';
import {PaperProvider} from 'react-native-paper'; // Import PaperProvider

Amplify.configure(config);

const App = () => {
  let [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_700Bold
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#000' />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <RootNavigation />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;
