import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';

import login from '../screens/auth/login/login';
import signup from '../screens/auth/signup/signup';
import verifyOtp from '../screens/auth/verifyOTP/verifyOtp';
import forgotPassword from '../screens/auth/forgotPassword/forgotPassword';
import accountSuccess from '../screens/auth/accountSuccess/accountSuccess';
import resetPassword from '../screens/auth/resetPassword/resetPassword';
import passwordChanged from '../screens/auth/passwordChanged/passwordChanged';
import LandingPage from '../screens/landingpage/landingpage1';
import QrScreen from '../screens/QR/QrScreen';
import SettingsScreen from '../screens/tab/settingsScreen/SettingsScreen';
// import Freedrink from '../screens/landingpage/freedrink';

const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='login' component={login} />

        <Stack.Screen name='forgotPassword' component={forgotPassword} />
        <Stack.Screen name='resetPassword' component={resetPassword} />
        <Stack.Screen name='QRScanner' component={QrScreen} />
        <Stack.Screen name='passwordChanged' component={passwordChanged} />
        <Stack.Screen name='verifyOtp' component={verifyOtp} />
        <Stack.Screen name='accountSuccess' component={accountSuccess} />
        <Stack.Screen name='signup' component={signup} />
        <Stack.Screen name='landingpage' component={LandingPage} />
        <Stack.Screen name='settings' component={SettingsScreen} />

        {/* <Stack.Screen name='freedrink' component={Freedrink} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
