import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingPage1 from '../screens/landingpage/landingpage1';
// import LandingPage2 from '../screens/landingpage/landingpage2';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LandingPage1'>
        <Stack.Screen name='LandingPage1' component={LandingPage1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
