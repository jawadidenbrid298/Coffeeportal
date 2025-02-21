import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from '@ant-design/react-native';
import {MaterialIcons} from '@expo/vector-icons';
import styles from './freedrinkstyles';

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

export default Freedrink;
