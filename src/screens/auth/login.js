import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable, Alert, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {signIn} from 'aws-amplify/auth';
import MyField from '../../components/shared/MyField';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

export default function LoginScreen({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (values, {setSubmitting}) => {
    setLoginError('');
    setLoading(true); // Show spinner
    try {
      const {isSignedIn, nextStep} = await signIn({
        username: values.email,
        password: values.password
      });
      console.log('Sign-in response:', {isSignedIn, nextStep});

      if (isSignedIn) {
        navigation.navigate('landingpage');
      } else {
        Alert.alert('Login Incomplete', JSON.stringify(nextStep, null, 2));
      }
    } catch (error) {
      console.error('Sign-in error details:', error.underlyingError);
      console.log('Error code:', error.code);
      console.log('Error message:', error.message);
      handleAuthError(error);
    } finally {
      setSubmitting(false);
      setLoading(false); // Hide spinner
    }
  };

  const handleAuthError = (error) => {
    console.log('Error details:', error);
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
                <MaterialCommunityIcons name='lock-outline' size={24} color={values.password ? '#C67C4E' : '#666'} />
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder='Password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setTouched({...touched, password: true})}
                  secureTextEntry={!showPassword}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <MaterialCommunityIcons
                    style={{position: 'absolute', right: 10, top: -12, width: 24}}
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color={values.password ? '#C67C4E' : '#666'}
                  />
                </Pressable>
              </View>
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  {
                    backgroundColor: '#C67C4E',
                    opacity: isValid && dirty ? 1 : 0.6
                  }
                ]}
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

              <TouchableOpacity onPress={() => navigation.navigate('landingpage')}>
                <Text style={styles.landingPageLink}>Take me to landing page</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    maxWidth: 700,
    // alignItems:"center",
    // justifyContent:"center",
    padding: 20
  },
  header: {
    marginTop: 60,
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#313131',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400'
  },
  form: {
    width: '100%'
  },
  forgotPassword: {
    color: '#C67C4E',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
    textDecorationLine: 'underline'
  },
  loginButton: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    flexDirection: 'row'
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1)',
    borderRadius: 12,
    marginBottom: 16,
    height: 48,
    width: '100%',
    gap: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white'
  },
  input: {
    fontSize: 16,
    color: '#333'
  },
  passwordInput: {
    width: '100%',
    marginRight: 8
  },
  errorText: {
    color: '#ff3333',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 4
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupText: {
    color: '#313131',
    fontSize: 14
  },
  signupLink: {
    color: '#C67C4E',
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline'
  },
  landingPageLink: {
    color: '#D9A789',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 16
  }
});
