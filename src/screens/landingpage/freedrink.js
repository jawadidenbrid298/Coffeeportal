import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from '@ant-design/react-native';
import {MaterialIcons} from '@expo/vector-icons';

const Freedrink = ({visible, onClose}) => {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.rewardText}>YOUR REWARDS</Text>
      <Card style={styles.card}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <MaterialIcons name='close' size={30} color='#6F0023' />
        </TouchableOpacity>
        <Image source={require('../../assets/awards.png')} style={styles.image}></Image>
        <Text style={styles.text}>You've got a free drink!</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -110,
    justifyContent: 'center'
  },
  rewardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'start'
  },
  card: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    marginBottom: 10
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6F0023',
    textAlign: 'center'
  }
});

export default Freedrink;
