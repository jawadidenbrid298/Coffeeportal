import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {confirmSignUp, confirmResetPassword} from 'aws-amplify/auth';
import OtpInput from '../../components/auth/OtpInput';
import CountdownTimer from '../../components/auth/CountdownTimer';

const VerifySchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, 'Please enter all digits')
    .required('OTP is required')
});

export default function VerifyOtp({navigation, route}) {
  const email = route.params?.email || 'onamsarker@mail.com';
  const mode = route.params?.from || 'signup';
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVerifyOtp = async (values) => {
    try {
      if (mode === 'signup') {
        const {isSignUpComplete} = await confirmSignUp({
          username: email,
          confirmationCode: values.otp
        });

        if (isSignUpComplete) {
          navigation.navigate('accountSuccess');
        }
      } else if (mode === 'forgotPassword') {
        navigation.navigate('resetPassword', {email, otp: values.otp});
      }
    } catch (error) {
      setErrorMessage(error.message || 'Error verifying OTP');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name='arrow-left' size={24} color='#H6H6H6' />
        </TouchableOpacity>

        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.subtitle}>
          Please enter the code we just sent to{'\n'}
          {email}
        </Text>

        <Formik initialValues={{otp: ''}} validationSchema={VerifySchema} onSubmit={handleVerifyOtp}>
          {({handleSubmit, values, setFieldValue, errors, isValid, dirty}) => (
            <View style={styles.form}>
              <OtpInput
                length={6}
                value={values.otp}
                onChange={(value) => setFieldValue('otp', value)}
                hasError={errors.otp}
              />

              {errors.otp && <Text style={styles.errorText}>{errors.otp}</Text>}
              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

              <View style={styles.timerContainer}>
                {canResend ? (
                  <TouchableOpacity onPress={() => setCanResend(false)}>
                    <Text style={styles.resendText}>Resend code</Text>
                  </TouchableOpacity>
                ) : (
                  <CountdownTimer initialSeconds={48} onComplete={() => setCanResend(true)} />
                )}
              </View>

              <TouchableOpacity style={[styles.continueButton]} onPress={handleSubmit} disabled={!(isValid && dirty)}>
                <Text style={[styles.continueButtonText, {color: 'white'}]}>Continue</Text>
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
    backgroundColor: '#E3E3E3'
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
    color: '#H6H6H6',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
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
    color: '#C67C4E',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  continueButton: {
    backgroundColor: '#C67C4E',
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
  }
});
