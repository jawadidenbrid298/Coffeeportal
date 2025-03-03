import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {confirmSignUp} from 'aws-amplify/auth';
import OtpInput from '../../../components/auth/OtpInput';
import CountdownTimer from '../../../components/auth/CountdownTimer';
import {styles} from './verifyOtpStyles';
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
  const [loading, setLoading] = useState(false); // Added loading state

  const handleVerifyOtp = async (values) => {
    setLoading(true); // Start loading
    setErrorMessage('');

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
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name='arrow-left' size={24} color='#666' />
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

              <TouchableOpacity
                style={[styles.continueButton, loading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={!(isValid && dirty) || loading}>
                {loading ? (
                  <ActivityIndicator size='small' color='white' />
                ) : (
                  <Text style={styles.continueButtonText}>Continue</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}
