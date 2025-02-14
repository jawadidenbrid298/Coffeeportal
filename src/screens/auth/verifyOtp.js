import React, { useState } from 'react';
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
import OtpInput from '../../components/auth/OtpInput';
import CountdownTimer from '../../components/auth/CountdownTimer';

const VerifySchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{5}$/, 'Please enter all digits')
    .required('OTP is required')
});

export default function VerifyOtp({ navigation, route }) {
  const email = route.params?.email || 'onamsarker@mail.com';
  const [canResend, setCanResend] = useState(false);

  const handleResend = () => {
    // Handle resend logic here
    setCanResend(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.subtitle}>
          Please enter the code we just sent to email{'\n'}
          {email}
        </Text>

        <Formik
          initialValues={{ otp: '' }}
          validationSchema={VerifySchema}
          onSubmit={values => {
            navigation.navigate('resetPassword');
            console.log(values);
            // Handle verification logic here
          }}
        >
          {({
            handleSubmit,
            values,
            setFieldValue,
            errors,

            isValid,
            dirty
          }) => (
            <View style={styles.form}>
              <OtpInput
                length={5}
                value={values.otp}
                onChange={value => setFieldValue('otp', value)}
                hasError={errors.otp}
              />

              {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}

              <View style={styles.timerContainer}>
                {canResend ? (
                  <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resendText}>Resend code</Text>
                  </TouchableOpacity>
                ) : (
                  <CountdownTimer
                    initialSeconds={48}
                    onComplete={() => setCanResend(true)}
                  />
                )}
              </View>
              <View style={{ flexDirection: 'row', marginBottom:20 }}>
                <Text style={[styles.resend, { color: 'white' }]}>
                  Code not received yet{' '}
                </Text>
                <Text style={[styles.resendCode, { color: 'white' }]}>
                  Resend code{' '}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  {
                    backgroundColor:
                      isValid && dirty
                        ? 'rgba(25, 154, 142, 1)'
                        : 'rgba(25, 154, 142, 0.5)'
                  }
                ]}
                onPress={() => handleSubmit()}
                disabled={!(isValid && dirty)}
              >
                <Text
                  style={[
                    styles.continueButtonText,
                    { color: isValid && dirty ? 'white' : 'white' }
                  ]}
                >
                  Continue{' '}
                </Text>
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
    backgroundColor: 'rgba(20, 123 ,114 ,1)'
  },
  content: {
    flex: 1,
    padding: 20
  },
  backButton: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 40,
    lineHeight: 20
  },
  form: {
    alignItems: 'center'
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 12
  },
  timerContainer: {
    marginTop: 24,
    marginBottom: 40
  },
  resendText: {
    color: '#fff',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  continueButton: {
    backgroundColor: '#7FFFD4',
    borderRadius: 8,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600'
  },
  resend: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400'
  },
  resendCode: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
    textDecorationLine:"underline"
  }
});
