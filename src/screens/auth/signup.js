import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import MyField from '../../components/shared/MyField';



const SignUpSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(2, 'Nickname too short')
    .required('Nickname is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /[a-zA-Z]/,
      'Password must contain at least one lowercase or uppercase letter'
    )
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  termsAccepted: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  )
});

export default function SignUpScreen({ navigation }) {
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [fadeAnim] = useState(new Animated.Value(1));

  const handlePasswordSuggestion = () => {
    setShowSuggestion(true);
    fadeAnim.setValue(1);
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start(() => setShowSuggestion(false));
    }, 1000);
  };
  const getPasswordStrength = password => {
    if (!password) return '';
    const hasLength = password.length >= 8;
    const hasLower = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const strength = [hasLength, hasLower, hasNumber].filter(Boolean).length;

    if (strength >= 3) return 'Cool! You have very strong password';
    return '';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>
          Create an account and enjoy all services!
        </Text>
      </View>

      <Formik
        initialValues={{
          nickname: '',
          email: '',
          password: '',
          termsAccepted: false
        }}
        validationSchema={SignUpSchema}
        onSubmit={values => {
          console.log(values);
          navigation.navigate('verifyOtp');
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          setTouched,
          isValid,
          dirty
        }) => (
          <View style={styles.form}>
            <MyField
              label="Nickname"
              placeholder="Full name"
              value={values.nickname}
              onChange={handleChange('nickname')}
              onBlur={() => setTouched({ ...touched, nickname: true })}
              icon="account-outline"
              error={errors.nickname}
              touched={touched.nickname}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <MyField
              label="Email"
              placeholder="Email address"
              value={values.email}
              onChange={handleChange('email')}
              onBlur={() => setTouched({ ...touched, email: true })}
              icon="email-outline"
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <MyField
              label="Password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange('password')}
              onBlur={() => setTouched({ ...touched, password: true })}
              icon="lock-outline"
              secureTextEntry
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={errors.password}
              touched={touched.password}
            />
            {values.password && (
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <MaterialCommunityIcons
                  name="check"
                  size={16}
                  color="rgba(95, 215, 136, 1)"
                  style={styles.icon}
                />
                <Text
                  style={{
                    color: 'rgba(156, 163, 175, 1)',
                    fontSize: 13,
                    fontWeight: '400'
                  }}
                >
                  {getPasswordStrength(values.password)}
                </Text>
              </View>
            )}{' '}
            <TouchableOpacity
              aria-disabled={
                errors.password == 'Password is required' ? false : true
              }
              style={{ flexDirection: 'row', marginTop: 10, gap: 5 }}
              onPress={handlePasswordSuggestion}
            >
              {/* <SheildCheck /> */}
              <Text style={styles.suggestion}>Password Suggestion</Text>
              {/* <Question /> */}
            </TouchableOpacity>
            {showSuggestion && (
              <Animated.View
                style={[styles.suggestionBox, { opacity: fadeAnim }]}
              >
                <View style={styles.ruleContainer}>
                  <MaterialCommunityIcons
                    name="close"
                    size={16}
                    color="#EF4444"
                    style={styles.icon}
                  />
                  <Text style={styles.ruleText}>Minimum 8 characters</Text>
                </View>
                <View style={styles.ruleContainer}>
                  <MaterialCommunityIcons
                    name="close"
                    size={16}
                    color="#EF4444"
                    style={styles.icon}
                  />
                  <Text style={styles.ruleText}>At least 1 number (1-9)</Text>
                </View>
                <View style={styles.ruleContainer}>
                  <MaterialCommunityIcons
                    name="close"
                    size={16}
                    color="#EF4444"
                    style={styles.icon}
                  />
                  <Text style={styles.ruleText}>
                    At least lowercase or uppercase letters
                  </Text>
                </View>
              </Animated.View>
            )}
            <View style={styles.termsContainer}>
              <Checkbox
                value={values.termsAccepted}
                onValueChange={value => setFieldValue('termsAccepted', value)}
                color={values.termsAccepted ? '#009688' : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.termsText}>
                I agree to the company's
                <Text style={styles.link}>Term of Service</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>
            {touched.termsAccepted && errors.termsAccepted && (
              <Text style={styles.errorText}>{errors.termsAccepted}</Text>
            )}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                {
                  backgroundColor:
                    isValid && dirty ? '#199A8E' : 'rgba(25, 154, 142, 0.5)'
                }
              ]}
              onPress={() => handleSubmit()}
              disabled={!(isValid && dirty)}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    padding: 20,
    paddingTop: 40
  },
  backButton: {
    marginBottom: 24,
    height: 50,
    width: 50
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: 'rgba(17, 24, 39, 1)',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(156, 163, 175, 1)'
  },
  form: {
    padding: 20
  },
  suggestionBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginTop: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'absolute',
    bottom: 70,
    left: 20,
    zIndex: 1
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
    fontSize: 14,
    fontWeight: '400',

    color: 'rgba(156, 163, 175, 1)'
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24
  },
  checkbox: {
    marginRight: 8,
    borderColor: 'rgba(209, 213, 219, 1)',
    borderRadius: 6
  },
  termsText: {
    flex: 1,
    color: '#666',
    fontSize: 14
  },
  link: {
    color: '#009688',
    textDecorationLine: 'underline'
  },
  suggestion: {
    color: 'rgba(156, 163, 175, 1)',
    fontSize: 13,
    fontWeight: '400'
  },
  signUpButton: {
    backgroundColor: '#009688',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: 'rgba(156, 163, 175, 1)',
    fontSize: 16,
    fontWeight: '400'
  },
  loginLink: {
    color: 'rgba(25, 154, 142, 1)',
    fontSize: 16,
    fontWeight: '400'
  }
});
