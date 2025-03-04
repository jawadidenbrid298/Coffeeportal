import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import Toast from 'react-native-toast-message';
import MyField from '../../../components/shared/MyField';
import {signUp} from 'aws-amplify/auth';
import {styles} from './signupStyles';

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
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');

  const showToast = (type, text1, text2) => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true
    });
  };

  const handleSignup = async (values, {setSubmitting, setErrors}) => {
    try {
      const combinedPhoneNumber = `+${callingCode}${values.phone.replace(/\D/g, '')}`;
      await signUp({
        username: values.email,
        password: values.password,
        options: {
          userAttributes: {
            email: values.email,
            phone_number: combinedPhoneNumber,
            name: values.nickname,
            'custom:type': 'Admin',
            'custom:countryCode': `+${callingCode}`,
            'custom:phoneNumber': values.phone.replace(/\D/g, '')
          },
          autoSignIn: true
        }
      });
      showToast('success', 'Sign Up Successful', 'Please verify your email.');
      navigation.navigate('verifyOtp', {email: values.email, from: 'signup'});
    } catch (error) {
      setErrors({email: error.message});
      showToast('error', 'Sign Up Failed', error.message);
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
        onSubmit={handleSignup}
        validateOnChange
        validateOnBlur>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
          isValid,
          dirty
        }) => (
          <View style={styles.form}>
            <MyField
              label='Nickname'
              placeholder='Full name'
              value={values.nickname}
              onChange={handleChange('nickname')}
              onBlur={handleBlur('nickname')}
              error={touched.nickname ? errors.nickname : ''}
            />

            <MyField
              label='Email'
              placeholder='Email address'
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email ? errors.email : ''}
            />

            <MyField
              label='Phone Number'
              placeholder='Enter phone number'
              value={values.phone}
              onChange={handleChange('phone')}
              onBlur={handleBlur('phone')}
              error={touched.phone ? errors.phone : ''}
              keyboardType='phone-pad'
              isPhoneField
              countryCode={countryCode}
              callingCode={callingCode}
              onCountryChange={setCountryCode}
              onCallingCodeChange={setCallingCode}
            />

            <MyField
              label='Password'
              placeholder='Password'
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              error={touched.password ? errors.password : ''}
            />

            <MyField
              label='Confirm Password'
              placeholder='Confirm Password'
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              secureTextEntry
              error={
                touched.confirmPassword && values.confirmPassword !== values.password
                  ? 'Passwords do not match'
                  : touched.confirmPassword
                  ? errors.confirmPassword
                  : ''
              }
            />

            <View style={styles.termsContainer}>
              <Checkbox
                value={values.termsAccepted}
                onValueChange={(value) => setFieldValue('termsAccepted', value)}
                color={values.termsAccepted ? '#65100D' : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.termsText}>
                I agree to the company's <Text style={styles.link}>Terms of Service</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>
            {touched.termsAccepted && errors.termsAccepted && (
              <Text style={styles.errorText}>{errors.termsAccepted}</Text>
            )}

            <TouchableOpacity
              style={[styles.signUpButton, {backgroundColor: '#65100D', opacity: isValid && dirty ? 1 : 0.6}]}
              onPress={handleSubmit}
              disabled={!(isValid && dirty) || isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator size='small' color='#FFF' />
              ) : (
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>

      <Toast />
    </ScrollView>
  );
}
