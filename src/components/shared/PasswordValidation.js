import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function PasswordValidation({password = '', confirmPassword = ''}) {
  const [allValid, setAllValid] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [isVisible, setIsVisible] = useState(true);

  const validationRules = [
    {
      label: 'Minimum 8 characters',
      isValid: password.length >= 8
    },
    {
      label: 'At least 1 number (1-9)',
      isValid: /[0-9]/.test(password)
    },
    {
      label: 'At least 1 lowercase or uppercase letter',
      isValid: /[a-zA-Z]/.test(password)
    }
  ];

  const allRulesValid = validationRules.every((rule) => rule.isValid);
  useEffect(() => {
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    if (allRulesValid) {
      setAllValid(true);

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start(() => {
        setIsVisible(false);
      });
    } else {
      setAllValid(false);
      fadeAnim.setValue(1);
      setIsVisible(true);
    }
  }, [allRulesValid, fadeAnim, password, confirmPassword]); // Ensure effect runs when either password changes

  if (!password || (allValid && fadeAnim._value === 0)) return null;

  return isVisible ? (
    <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
      {validationRules.map((rule, index) => (
        <View key={index} style={styles.ruleContainer}>
          <MaterialCommunityIcons
            name={rule.isValid ? 'check' : 'close'}
            size={16}
            color={rule.isValid ? '#22C55E' : '#EF4444'}
            style={styles.icon}
          />
          <Text style={[styles.ruleText, rule.isValid ? styles.validRule : styles.invalidRule]}>{rule.label}</Text>
        </View>
      ))}
    </Animated.View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  ruleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  icon: {
    marginRight: 8
  },
  ruleText: {
    fontSize: 14
  },
  validRule: {
    color: '#6B7280'
  },
  invalidRule: {
    color: '#EF4444'
  }
});
