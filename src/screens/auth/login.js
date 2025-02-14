import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Pressable} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MyField from '../../components/shared/MyField';
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});
import {MaterialCommunityIcons} from '@expo/vector-icons';

export default function LoginScreen({navigation}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login in to your account</Text>
      </View>

      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          console.log(values);
          // Handle login logic here
          navigation.navigate('landingpage1'); // Navigate to landingpage1 after valid login
        }}>
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
              <MaterialCommunityIcons
                name='lock-outline'
                size={24}
                color={values.password ? 'rgba(25, 154, 142, 1)' : '#666'} // Change color if user types
              />
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
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={24}
                  color={values.password ? 'rgba(25, 154, 142, 1)' : '#666'} // Change color if user types
                />
              </Pressable>
            </View>
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  backgroundColor: isValid && dirty ? '#199A8E' : 'rgba(25, 154, 142, 0.5)'
                }
              ]}
              onPress={() => handleSubmit()}
              disabled={!(isValid && dirty)}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            {/* New link added for "Take me to landing page" */}
            <TouchableOpacity onPress={() => navigation.navigate('landingpage1')}>
              <Text style={styles.landingPageLink}>Take me to landing page</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    padding: 20
  },
  header: {
    marginTop: 60,
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: 'rgba(17, 24, 39, 1)',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(156, 163, 175, 1)',
    fontWeight: '400'
  },
  form: {
    width: '100%'
  },
  forgotPassword: {
    color: 'rgba(25, 154, 142, 1)',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24
  },
  loginButton: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1)',
    borderRadius: 12,
    marginBottom: 16,
    height: '100%',
    maxHeight: 48,
    gap: 16,
    paddingHorizontal: 12,

    backgroundColor: 'white'
  },
  icon: {
    marginRight: 8,
    color: 'rgba(156, 163, 175, 1)'
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',

    maxHeight: 48,

    color: '#333'
  },
  passwordInput: {
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
    color: 'rgba(156, 163, 175, 1)',
    fontSize: 14
  },
  signupLink: {
    color: 'rgba(25, 154, 142, 1)',
    fontSize: 14,
    fontWeight: '400'
  },
  landingPageLink: {
    color: 'rgba(25, 154, 142, 1)',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 16
  }
});
