import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {AntDesign, Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {generateClient} from 'aws-amplify/api';
import {getCurrentUser} from 'aws-amplify/auth';
import styles from './landingpagestyles';
import {getUsers} from '../../graphql/queries';
import Freedrink from '../freedrink/freedrink';

const client = generateClient();

const LandingPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const [showFreeDrink, setShowFreeDrink] = useState(true);

  const fetchUser = async () => {
    try {
      const {userId} = await getCurrentUser();
      const response = await client.graphql({
        query: getUsers,
        variables: {id: userId}
      });

      setUserData(response.data.getUsers);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchUser();
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
    setRefreshing(false);
  }, []);

  const handleSettingsNavigation = () => {
    setDropdownVisible(false);
    navigation.navigate('settings');
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.userInfoContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
              <AntDesign name='down' size={20} color='black' />
            </TouchableOpacity>
            <Text style={styles.greeting}>Hi, {userData?.name || 'User'}</Text>
          </View>
          <Text style={styles.phone}>{userData?.phoneNumber || '+XXX-XXX-XXX'}</Text>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleSettingsNavigation}>
                <Feather name='settings' size={20} color='black' />
                <Text style={styles.dropdownText}>Settings</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Image source={require('../../assets/coffee.png')} style={styles.icon} />
            <Text style={styles.statNumber}>{userData?.stamps || 0} / 10</Text>
            <Text style={styles.statLabel}>Purchased Drinks</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.statBox}>
            <Image source={require('../../assets/coffee.png')} style={styles.icon} />
            <Text style={styles.statNumber}>{userData?.freeDrinks || 0} Drinks</Text>
            <Text style={styles.statLabel}>Total Drink</Text>
          </View>
        </View>
      </View>

      <Freedrink
        visible={showFreeDrink}
        onClose={() => setShowFreeDrink(false)}
        rewards={[
          userData?.stamps === 10
            ? 'You have a free drink!'
            : `${10 - (userData?.stamps || 0)} cups to go for a free drink!`,
          'Drink'
        ]}
      />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Image source={require('../../assets/backgroundimage.jpg')} style={styles.image} />

        {/* Animated Circle */}
        <View style={styles.animatedCircleContainer}>
          <AnimatedCircularProgress
            size={220}
            width={8}
            fill={((userData?.stamps || 0) / 10) * 100}
            tintColor='red'
            backgroundColor='white'
            rotation={0}>
            {() => (
              <View style={styles.contentContainer}>
                <Image source={require('../../assets/coin.png')} style={styles.circleIcon} />
                <Text style={styles.circleNumber}>{userData?.stamps || 0}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
          <Text style={styles.circleLabel}>Balance Points</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default LandingPage;
