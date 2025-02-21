import React, {useState, useEffect} from 'react';
import {View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, RefreshControl, Animated} from 'react-native';
import {getCurrentUser} from 'aws-amplify/auth';
import {Card} from '@ant-design/react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Freedrink from '../freedrink/freedrink';
import SignOutButton from '../auth/signout';
import styles from './landingpagestyles';
import {generateClient} from '@aws-amplify/api';
import {getUser} from '../../graphql/queries';

const client = generateClient();

const LandingPage1 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [tilt] = useState(new Animated.Value(0));

  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const {userId} = await getCurrentUser(); // Get user ID
      const response = await client.graphql({
        query: getUser,
        variables: {id: userId}
      });

      setUserData(response.data.getUser);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const tiltAnimation = () => {
      Animated.sequence([
        Animated.timing(tilt, {toValue: 20, duration: 150, useNativeDriver: true}),
        Animated.timing(tilt, {toValue: -20, duration: 150, useNativeDriver: true}),
        Animated.timing(tilt, {toValue: 0, duration: 150, useNativeDriver: true})
      ]).start();
    };

    const interval = setInterval(tiltAnimation, 3000);
    return () => clearInterval(interval);
  }, [tilt]);

  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchUserData();
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
        <ImageBackground source={require('../../assets/landingpagebackground.png')} style={styles.imageBackground}>
          <View style={styles.topSection}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.nameContainer}>
              <Text style={styles.greeting}>Hi, {userData?.name}</Text>
              <MaterialIcons name='arrow-drop-down' size={24} color='#f8f8f8' />
            </TouchableOpacity>
            <Text style={styles.phone}>{userData?.phoneNumber || 'N/A'}</Text>

            {dropdownVisible && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity onPress={SignOutButton} style={styles.dropdownItem}>
                  <SignOutButton />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.cardContainer}>
              <Card style={styles.card}>
                <MaterialIcons name='store' size={48} color='#6F0023' />
                <Text style={styles.cardText}>Scan at Shop</Text>
              </Card>
              <Card style={styles.card}>
                <MaterialIcons name='qr-code' size={48} color='#6F0023' />
                <Text style={styles.cardText}>Scan at Machine</Text>
              </Card>
            </View>

            <Card style={styles.readingCard}>
              <View style={styles.textContainer}>
                <Text style={styles.firstDigit}>7/</Text>
                <Text style={styles.secondDigit}>10</Text>
              </View>
              <MaterialIcons name='sports-rugby' size={20} color='#A67C00' />

              {/* Fixed Divider */}
              <View style={styles.divider} />

              <Text style={styles.readingText}>{userData?.freeDrinks || '0'}</Text>

              <TouchableOpacity style={styles.imageWrapper} onPress={toggleModal}>
                <Animated.Image
                  source={require('../../assets/coffee.png')}
                  style={[
                    styles.coffeeImage,
                    {
                      transform: [
                        {
                          rotate: tilt.interpolate({
                            inputRange: [-20, 20],
                            outputRange: ['-20deg', '20deg']
                          })
                        }
                      ]
                    }
                  ]}
                />
              </TouchableOpacity>
            </Card>
          </View>
        </ImageBackground>

        <View style={{paddingHorizontal: 20}}>
          <Freedrink visible={modalVisible} onClose={toggleModal} />

          <View style={styles.bottomSection}>
            <Text style={styles.brewedText}>BREWED FOR YOU</Text>

            <Card style={styles.imageCard}>
              <Image source={require('../../assets/istockphoto.png')} style={styles.image} />
              <Text style={styles.imageText}>15 years as your fave</Text>
              <Text style={styles.nationText}>Named the nation's favourite coffee shop</Text>
            </Card>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default LandingPage1;
