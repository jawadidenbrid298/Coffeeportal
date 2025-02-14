import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyField from '../../components/shared/MyField';
const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function ResetPassword({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email, we will send a verification code to email
          </Text>
        </View>

        <Formik
          initialValues={{ email: 'onamsarker@email.com' }}
          validationSchema={ResetSchema}
          onSubmit={(values) => {
            console.log(values);
            // Handle password reset logic here
            navigation.navigate('verifyOtp', { email: values.email });
          }}
        >
          {({ handleSubmit, values, errors, touched, handleChange, handleBlur }) => (
            <View style={styles.form}>
              <MyField 
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                icon="email-outline"
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
              />

              <TouchableOpacity 
                style={styles.sendButton}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.sendButtonText}>Send Link</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 24,
    height: 50,
    width: 50
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  form: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#009688',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

