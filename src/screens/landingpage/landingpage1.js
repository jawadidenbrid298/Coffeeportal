import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Card, Tabs} from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IsStockPhoto from '../../assets/istockphoto.png';

const LandingPage1 = () => {
  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Text style={styles.cardText}>Scan at Shop</Text>
          </Card>
          <Card style={styles.card}>
            <Text style={styles.cardText}>Scan at Machine</Text>
          </Card>
        </View>
      </View>

      {/* Below Section */}
      <View style={styles.bottomSection}>
        <Card style={styles.imageCard}>
          <Image
            source={IsStockPhoto} // Replace with actual image URI
            style={styles.image}
          />
          <Text style={styles.imageText}>15 years as your fave</Text>
        </Card>
      </View>

      {/* <Tabs tabBarPosition='bottom' initialPage={0} style={styles.tabs}>
        <Tabs.Tab tab={<Icon name='home' size={20} />} key='home'>
          <Text>Home</Text>
        </Tabs.Tab>
        <Tabs.Tab tab={<Icon name='search1' size={20} />} key='search'>
          <Text>Glass</Text>
        </Tabs.Tab>
        <Tabs.Tab tab={<Icon name='enviroment' size={20} />} key='location'>
          <Text>Location</Text>
        </Tabs.Tab>
        <Tabs.Tab tab={<Icon name='gift' size={20} />} key='rewards'>
          <Text>Rewards</Text>
        </Tabs.Tab>
        <Tabs.Tab tab={<Icon name='setting' size={20} />} key='settings'>
          <Text>Settings</Text>
        </Tabs.Tab>
      </Tabs> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topSection: {
    flex: 1,
    backgroundColor: '#800000', // Maroon background
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    flexDirection: 'row'
  },
  card: {
    margin: 10,
    width: 180,
    height: 120,

    alignItems: 'center',
    borderRadius: 20
  },
  cardText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'start'
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageCard: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 10
  },
  imageText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center'
  },
  tabs: {
    backgroundColor: '#fff'
  }
});

export default LandingPage1;
