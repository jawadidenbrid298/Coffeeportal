import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Animated
} from 'react-native';
import {Card} from '@ant-design/react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Freedrink from './freedrink';
import SignOutButton from '../auth/signout'; // Importing your existing SignOut component

const LandingPage1 = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [tilt] = useState(new Animated.Value(0));

  const toggleModal = () => setModalVisible(!modalVisible);
  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

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

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
        <ImageBackground source={require('../../assets/landingpagebackground.png')} style={styles.imageBackground}>
          <View style={styles.topSection}>
            {/* Name and Dropdown Menu */}
            <TouchableOpacity onPress={toggleDropdown} style={styles.nameContainer}>
              <Text style={styles.greeting}>Hi, Farva</Text>
              <MaterialIcons name='arrow-drop-down' size={24} color='#f8f8f8' />
            </TouchableOpacity>
            <Text style={styles.phone}>+1234578906</Text>

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
              <MaterialIcons name='sports-rugby' size={24} color='#A67C00' />
              <View style={styles.divider} />
              <Text style={styles.readingText}>1</Text>

              {/* Coffee Image with Tilt Animation */}
              <TouchableOpacity style={styles.imageWrapper} onPress={toggleModal}>
                <Animated.Image
                  source={require('../../assets/coffee.png')}
                  style={[
                    styles.coffeeImage,
                    {
                      transform: [
                        {
                          rotate: tilt.interpolate({
                            inputRange: [-10, 10],
                            outputRange: ['-10deg', '10deg']
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

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollViewContent: {flexGrow: 1},
  imageBackground: {width: '100%', resizeMode: 'cover'},
  topSection: {height: 400, justifyContent: 'center', alignItems: 'center', width: '100%'},
  nameContainer: {flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 20, left: 20},
  greeting: {fontSize: 24, fontWeight: 'bold', color: '#f8f8f8'},
  phone: {position: 'absolute', top: 60, left: 20, fontSize: 16, color: '#f8f8f8'},
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  dropdownItem: {flexDirection: 'row', alignItems: 'center', paddingVertical: 10},
  dropdownText: {fontSize: 16, color: '#800000', marginLeft: 10},
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%'
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FECACA'
  },
  cardText: {color: '#6F0023', fontSize: 16, textAlign: 'center'},
  readingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FECACA',
    borderRadius: 20,
    position: 'absolute',
    top: 20,
    right: 20,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 200
  },
  textContainer: {flexDirection: 'row', alignItems: 'center'},
  readingText: {fontSize: 28, fontWeight: 'bold', color: '#9B1C1C', marginLeft: 1},
  divider: {width: 2, height: '60%', backgroundColor: '#9B1C1C', marginHorizontal: 5},
  imageWrapper: {position: 'absolute', right: -10, top: -15, zIndex: 2},
  coffeeImage: {width: 60, height: 75},
  bottomSection: {width: '100%', marginTop: 20, alignItems: 'center'},
  brewedText: {fontSize: 18, fontWeight: 'bold', color: '#800000', marginBottom: 10, alignSelf: 'flex-start'},
  imageCard: {width: '100%', borderRadius: 20, marginBottom: 20, overflow: 'hidden'},
  image: {width: '100%', height: 150},
  imageText: {
    marginTop: 10,
    fontSize: 20,
    color: '#800000',
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  nationText: {fontSize: 16, color: 'black', textAlign: 'left', width: '100%', paddingHorizontal: 10},
  firstDigit: {fontSize: 32, color: '#9B1C1C', fontWeight: 'bold', marginLeft: 10},
  secondDigit: {fontSize: 24, marginLeft: 1, color: '#9B1C1C', fontWeight: 'bold'}
});

export default LandingPage1;
