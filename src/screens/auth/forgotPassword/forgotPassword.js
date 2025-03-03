import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import MyField from '../../../components/shared/MyField';
import {resetPassword} from 'aws-amplify/auth';
import {styles} from './forgotPasswordStyles';
const ResetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required')
});

async function handleResetPassword(username, navigation) {
  try {
    const output = await resetPassword({username});
    handleResetPasswordNextSteps(output, navigation, username); // Pass original email
  } catch (error) {
    console.log(error);
  }
}

function handleResetPasswordNextSteps(output, navigation, email) {
  const {nextStep} = output;
  switch (nextStep.resetPasswordStep) {
    case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
      console.log(`Confirmation code was sent to ${nextStep.codeDeliveryDetails.deliveryMedium}`);
      // Pass the original email instead of codeDeliveryDetails.destination
      navigation.navigate('verifyOtp', {email, from: 'forgotPassword'});
      break;
    case 'DONE':
      console.log('Successfully reset password.');
      break;
  }
}

export default function ResetPassword({navigation}) {
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
          initialValues={{email: 'onamsarker@email.com'}}
          validationSchema={ResetSchema}
          onSubmit={(values) => {
            console.log(values);
            handleResetPassword(values.email, navigation);
          }}>
          {({handleSubmit, values, errors, touched, handleChange, handleBlur}) => (
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

              <TouchableOpacity style={styles.sendButton} onPress={() => handleSubmit()}>
                <Text style={styles.sendButtonText}>Send Link</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}
