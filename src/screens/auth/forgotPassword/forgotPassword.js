import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import MyField from '../../../components/shared/MyField';
import {resetPassword} from 'aws-amplify/auth';
import {styles} from './forgotPasswordStyles';
import Toast from 'react-native-toast-message';

const ResetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required')
});

async function handleResetPassword(username, navigation, setLoading) {
  try {
    setLoading(true);
    const output = await resetPassword({username});
    handleResetPasswordNextSteps(output, navigation, username);
  } catch (error) {
    Toast.show({type: 'error', text1: 'Error', text2: error.message});
  } finally {
    setLoading(false);
  }
}

function handleResetPasswordNextSteps(output, navigation, email) {
  const {nextStep} = output;
  switch (nextStep.resetPasswordStep) {
    case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
      console.log(`Confirmation code was sent to ${nextStep.codeDeliveryDetails.deliveryMedium}`);
      navigation.navigate('verifyOtp', {email, from: 'forgotPassword'});
      break;
    case 'DONE':
      console.log('Successfully reset password.');
      break;
  }
}

export default function ResetPassword({navigation}) {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name='arrow-left' size={24} color='#000' />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your email, we will send a verification code to email</Text>
        </View>

        <Formik
          initialValues={{email: ''}}
          validationSchema={ResetSchema}
          onSubmit={(values) => handleResetPassword(values.email, navigation, setLoading)}>
          {({handleSubmit, values, errors, touched, handleChange, handleBlur, isValid, dirty}) => (
            <View style={styles.form}>
              <MyField
                label='Email'
                placeholder='Enter your email'
                value={values.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                icon='email-outline'
                error={errors.email}
                touched={touched.email}
                keyboardType='email-address'
              />
              <TouchableOpacity
                style={[styles.sendButton, {backgroundColor: '#65100D', opacity: isValid && dirty ? 1 : 0.6}]}
                onPress={handleSubmit}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator size='small' color='#FFF' />
                ) : (
                  <Text style={styles.sendButtonText}>Send Link</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      <Toast />
    </SafeAreaView>
  );
}
