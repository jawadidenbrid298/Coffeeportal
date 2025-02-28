import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import CountryPicker from 'react-native-country-code-picker';

import MyField from '../../components/shared/MyField';
import {signUp} from 'aws-amplify/auth';
import {ActivityIndicator} from 'react-native';

const SignUpSchema = Yup.object().shape({
  nickname: Yup.string().min(2, 'Nickname too short').required('Nickname is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
});

export default function SignUpScreen({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  const handleSignup = async (values, {setSubmitting, setErrors}) => {
    try {
      // Parse the entered phone number.
      // If it starts with '+' we extract the country code by assuming that the remaining 10 digits are the local number.
      // Otherwise, default to '+1'
      const phoneValue = values.phone;
      const phoneDigits = phoneValue.replace(/\D/g, '');
      let selectedCountryCode = '';
      let phoneNumberWithoutCountryCode = '';

      if (phoneValue.startsWith('+')) {
        const totalDigits = phoneDigits.length;
        if (totalDigits > 10) {
          const countryCodeLength = totalDigits - 10;
          selectedCountryCode = '+' + phoneDigits.substring(0, countryCodeLength);
          phoneNumberWithoutCountryCode = phoneDigits.substring(countryCodeLength);
        } else {
          selectedCountryCode = '+1';
          phoneNumberWithoutCountryCode = phoneDigits;
        }
      } else {
        selectedCountryCode = '+1';
        phoneNumberWithoutCountryCode = phoneDigits;
      }

      const combinedPhoneNumber = selectedCountryCode + phoneNumberWithoutCountryCode;

      const {isSignUpComplete, userId, nextStep} = await signUp({
        username: values.email,
        password: values.password,
        options: {
          userAttributes: {
            email: values.email,
            phone_number: combinedPhoneNumber,
            name: values.nickname,
            'custom:type': 'User',
            'custom:countryCode': selectedCountryCode,
            'custom:phoneNumber': phoneNumberWithoutCountryCode
          }
        }
      });

      console.log('SignUp complete:', isSignUpComplete);
      console.log('User ID:', userId);

      navigation.navigate('verifyOtp', {email: values.email, from: 'signup'});
    } catch (error) {
      console.log('Error signing up:', error);
      setErrors({email: error.message});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name='arrow-left' size={24} color='#000' />
        </TouchableOpacity>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create an account and enjoy all services!</Text>
      </View>

      <Formik
        initialValues={{
          nickname: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          termsAccepted: false
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignup}>
        {({handleChange, handleSubmit, values, errors, touched, setFieldValue, isSubmitting, isValid, dirty}) => (
          <View style={styles.form}>
            <MyField
              label='Nickname'
              placeholder='Full name'
              value={values.nickname}
              onChange={handleChange('nickname')}
              error={errors.nickname}
              touched={touched.nickname}
            />
            <MyField
              label='Email'
              placeholder='Email address'
              value={values.email}
              onChange={handleChange('email')}
              error={errors.email}
              touched={touched.email}
            />
            <MyField
              label='Phone Number'
              placeholder='Phone number'
              value={values.phone}
              onChange={handleChange('phone')}
              error={errors.phone}
              touched={touched.phone}
              leftComponent={
                <View style={{width: 80}}>
                  {' '}
                  {/* Adjust width as needed */}
                  <CountryPicker
                    onSelect={(country) => {
                      console.log('Selected Country:', country);
                      setFieldValue('phone', `+${country.callingCode}`);
                    }}
                    withFlag
                    withCallingCode
                  />
                </View>
              }
            />
            <MyField
              label='Password'
              placeholder='Password'
              value={values.password}
              onChange={handleChange('password')}
              secureTextEntry={!showPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={errors.password}
              touched={touched.password}
            />
            <MyField
              label='Confirm Password'
              placeholder='Confirm Password'
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              secureTextEntry={!showConfirmPassword}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <View style={styles.termsContainer}>
              <Checkbox
                value={values.termsAccepted}
                onValueChange={(value) => setFieldValue('termsAccepted', value)}
                color={values.termsAccepted ? '#65100D' : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.termsText}>
                I agree to the company's
                <Text style={styles.link}> Term of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>
            {touched.termsAccepted && errors.termsAccepted && (
              <Text style={styles.errorText}>{errors.termsAccepted}</Text>
            )}

            <TouchableOpacity
              style={[
                styles.signUpButton,
                {
                  backgroundColor: '#65100D',
                  opacity: isValid && dirty ? 1 : 0.6
                }
              ]}
              onPress={handleSubmit}
              disabled={!(isValid && dirty) || isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator size='small' color='#FFF' />
              ) : (
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              )}
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
  container: {flex: 1, backgroundColor: '#FFF'},
  header: {padding: 20, paddingTop: 40},
  backButton: {marginBottom: 24, height: 50, width: 50},
  title: {fontSize: 24, fontWeight: '400', color: '#313131', marginBottom: 8},
  subtitle: {fontSize: 16, fontWeight: '400', color: '#666'},
  form: {padding: 20},
  // MyField's styles for label, inputContainer, and input remain as defined in your project
  termsContainer: {flexDirection: 'row', alignItems: 'center', marginVertical: 24},
  checkbox: {marginRight: 8, borderColor: 'rgba(209, 213, 219, 1)', borderRadius: 6},
  termsText: {flex: 1, color: '#666', fontSize: 14},
  link: {color: '#65100D', textDecorationLine: 'underline'},
  signUpButton: {
    backgroundColor: '#009688',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  signUpButtonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  loginContainer: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
  loginText: {color: 'rgba(156, 163, 175, 1)', fontSize: 16, fontWeight: '400'},
  loginLink: {color: '#65100D', fontSize: 16, fontWeight: '400', textDecorationLine: 'underline'},
  errorText: {color: 'red', fontSize: 12}
});
