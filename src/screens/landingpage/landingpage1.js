import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, Image, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator} from 'react-native';
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
  const [showFreeDrink, setShowFreeDrink] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const fetchUser = async () => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        navigation.reset({index: 0, routes: [{name: 'login'}]});
        return;
      }

      const response = await client.graphql({
        query: getUsers,
        variables: {id: user.userId}
      });

      setUserData(response.data.getUsers);
    } catch (error) {
      console.error('Error fetching user:', error);
      navigation.reset({index: 0, routes: [{name: 'login'}]});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchUser();
    setRefreshing(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#65100D' />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.topSection}>
        <View style={styles.userInfoContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
              <AntDesign name='caretdown' size={16} color='black' />
            </TouchableOpacity>

            <Text style={styles.greeting}>
  Hi, {userData?.name?.length > 15 ? `${userData.name.slice(0, 15)}...` : userData?.name || 'User'}
</Text>
          </View>
          <Text style={styles.phone}>{userData?.fullPhoneNumber || '+XX-XXX-XXXXXXX'}</Text>

          {dropdownVisible && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => navigation.navigate('settings', {userData})}>
                <Feather name='settings' size={20} color='#333' />
                <Text style={styles.dropdownText}>Settings</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.statsGrid}>
          {[
            {label: 'Purchased Drinks', count: userData?.purchaseCount || 0, total: '/ 10'},
            {label: 'Total Drink', count: userData?.freeDrinks || 0, total: ' Drinks'}
          ].map((item, index) => (
            <React.Fragment key={index}>
              <View style={styles.statBox}>
                <Image source={require('../../assets/coffee.png')} style={styles.icon} />
                <Text style={styles.statNumber}>
                  {item.count} {item.total}
                </Text>
                <Text style={styles.statLabel}>{item.label}</Text>
              </View>
              {index === 0 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>
      </View>

      <Freedrink
        visible={showFreeDrink}
        onClose={() => setShowFreeDrink(false)}
        rewards={[
          userData?.freeDrinks > 1
            ? `You have got ${userData?.freeDrinks} Drinks`
            : userData?.freeDrinks > 0
            ? 'You got a free Drink'
            : `${10 - (userData?.purchaseCount || 0)} Cups to Go for a Free`
        ]}
      />

      <View style={styles.bottomSection}>
        <Image source={require('../../assets/backgroundimage.jpg')} style={styles.image} />

        <View style={styles.animatedCircleContainer}>
          <AnimatedCircularProgress
            size={220}
            width={8}
            fill={((userData?.coins || 0) / 10) * 100}
            tintColor='white'
            backgroundColor='white'
            rotation={0}>
            {() => (
              <View style={styles.contentContainer}>
                <Image source={require('../../assets/coin.png')} style={styles.circleIcon} />
                <Text style={styles.circleNumber}>{userData?.coins || 0}</Text>
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
