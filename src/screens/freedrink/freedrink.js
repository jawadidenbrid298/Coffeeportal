import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {Card} from '@ant-design/react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import styles from './freedrinkstyles';

const Freedrink = ({visible, onClose, rewards}) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <LinearGradient
          colors={['rgba(50, 7, 6, 1)', 'rgba(152, 22, 17, 1)']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.gradient}
        />

        <View style={styles.contentContainer}>
          <View style={styles.leftStack}>
            <Text style={styles.countText}>{rewards?.[0] || '10 cups to go for a free Drink!'}</Text>
            <Text style={styles.drinkText}>{rewards?.[1] || 'Drink'}</Text>
          </View>

          <View style={styles.rightStack}>
            <Image source={require('../../assets/freedrink.png')} style={styles.rewardImage} />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default Freedrink;
