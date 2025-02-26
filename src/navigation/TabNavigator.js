import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from 'react-native-vector-icons';

import GiftScreen from '../screens/tab/giftScreen';
import LocationScreen from '../screens/tab/locationScreen';
import LandingPage1 from '../screens/landingpage/landingpage1';
import SettingsScreen from '../screens/tab/settingsScreen/SettingsScreen';

import QRCodeGenerator from '../components/qrcode/ QRCodeGenerator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Gifts') {
            iconName = focused ? 'gift' : 'gift-outline';
          } else if (route.name === 'Location') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'QR') {
            iconName = focused ? 'barcode-scan' : 'barcode';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: '#C67C4E',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {backgroundColor: 'white', paddingBottom: 5}
      })}>
      <Tab.Screen name='Home' component={LandingPage1} />
      <Tab.Screen name='Gifts' component={GiftScreen} />
      <Tab.Screen name='QR' component={QRCodeGenerator} />
      <Tab.Screen name='Location' component={LocationScreen} />
      <Tab.Screen name='Settings' component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
