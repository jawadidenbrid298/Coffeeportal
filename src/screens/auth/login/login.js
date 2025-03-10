import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, Pressable, Alert, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {signIn, getCurrentUser} from 'aws-amplify/auth';
import MyField from '../../../components/shared/MyField';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {styles} from './loginStyles';
import Toast from 'react-native-toast-message';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

export default function LoginScreen({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          navigation.replace('landingpage');
        }
      } catch (error) {
        console.log('User not signed in:', error);
      }
    };
    checkAuthStatus();
  }, []);

  const handleSignIn = async (values, {setSubmitting}) => {
    setLoginError('');
    setLoading(true);
    try {
      const {isSignedIn, nextStep} = await signIn({
        username: values.email,
        password: values.password
      });
      if (isSignedIn) {
        navigation.replace('landingpage');
      } else {
        Alert.alert('Login Incomplete', JSON.stringify(nextStep, null, 2));
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  const handleAuthError = (error) => {
    let message = 'An unknown error occurred. Please try again.';
    if (error.code === 'UserNotFoundException') {
      message = 'No user found with this email.';
    } else if (error.code === 'NotAuthorizedException') {
      message = 'Incorrect email or password.';
    } else if (error.code === 'UserNotConfirmedException') {
      message = 'Your account is not confirmed. Please verify your email.';
    } else if (error.code === 'PasswordResetRequiredException') {
      message = 'Password reset required. Please reset your password.';
    } else if (error.message) {
      message = error.message;
    }
    setLoginError(message);
    Toast.show({
      type: 'error',
      text1: 'Login Error',
      text2: message
    });
  };

  return (
    <View style={{backgroundColor: 'grey', height: '100%', flexDirection: 'row', justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to your account</Text>
        </View>

        <Formik initialValues={{email: '', password: ''}} validationSchema={LoginSchema} onSubmit={handleSignIn}>
          {({handleChange, handleSubmit, values, errors, touched, isValid, dirty, setTouched}) => (
            <View style={styles.form}>
              <MyField
                label='Email'
                placeholder='Email address'
                value={values.email}
                onChange={handleChange('email')}
                onBlur={() => setTouched({...touched, email: true})}
                icon='email-outline'
                error={errors.email}
                touched={touched.email}
                keyboardType='email-address'
                autoCapitalize='none'
              />

              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name='lock-outline' size={24} color={values.password ? '#65100D' : '#666'} />
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder='Password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setTouched({...touched, password: true})}
                  secureTextEntry={!showPassword}
                />
                <Pressable style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color={values.password ? '#65100D' : '#666'}
                  />
                </Pressable>
              </View>
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

              <TouchableOpacity
                style={[styles.loginButton, {backgroundColor: '#65100D', opacity: isValid && dirty ? 1 : 0.6}]}
                onPress={handleSubmit}
                disabled={!(isValid && dirty) || loading}>
                {loading ? (
                  <ActivityIndicator size='small' color='#fff' />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                  <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
      <Toast />
    </View>
  );
}
