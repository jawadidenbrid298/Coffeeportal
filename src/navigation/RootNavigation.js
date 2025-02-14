import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';

import login from '../screens/auth/login';
import signup from '../screens/auth/signup';
import verifyOtp from '../screens/auth/verifyOtp';
import forgotPassword from '../screens/auth/forgotPassword';
import accountSuccess from '../screens/auth/accountSuccess';
import resetPassword from '../screens/auth/resetPassword';
import passwordChanged from '../screens/auth/passwordChanged';

import LandingPage1 from '../screens/landingpage/landingpage1';
const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='login'>
        <Stack.Screen name='forgotPassword' component={forgotPassword} />
        <Stack.Screen name='resetPassword' component={resetPassword} />
        <Stack.Screen name='passwordChanged' component={passwordChanged} />
        <Stack.Screen name='verifyOtp' component={verifyOtp} />
        <Stack.Screen name='accountSuccess' component={accountSuccess} />
        <Stack.Screen name='login' component={login} />
        <Stack.Screen name='signup' component={signup} />
        <Stack.Screen name='landingpage1' component={LandingPage1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
