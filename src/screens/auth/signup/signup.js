// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated} from 'react-native';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
// import Checkbox from 'expo-checkbox';
// import CountryPicker from 'react-native-country-picker-modal';
// import MyField from '../../../components/shared/MyField';
// import {signUp} from 'aws-amplify/auth';
// import {ActivityIndicator} from 'react-native';
// import {styles} from './signupStyles';

// const SignUpSchema = Yup.object().shape({
//   nickname: Yup.string().min(2, 'Nickname too short').required('Nickname is required'),
//   email: Yup.string().email('Invalid email address').required('Email is required'),
//   phone: Yup.string().required('Phone number is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
//     .matches(/[0-9]/, 'Password must contain at least one number')
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//     .required('Confirm Password is required'),
//   termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions')
// });

// export default function SignUpScreen({navigation}) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [fadeAnim] = useState(new Animated.Value(1));
//   const [countryCode, setCountryCode] = useState('US'); // Default country
//   const [callingCode, setCallingCode] = useState('+1');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [selectedCountryCode, setSelectedCountryCode] = useState('');

//   const [loading, setLoading] = useState(true);

//   const [phoneNumberWithoutCountryCode, setPhoneNumberWithoutCountryCode] = useState('');

//   const handleSignup = async (values, {setSubmitting, setErrors}) => {
//     try {
//       console.log('Form values:', values);
//       const combinedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;

//       console.log('phone numberr', combinedPhoneNumber, selectedCountryCode, phoneNumberWithoutCountryCode);

//       const {isSignUpComplete, userId, nextStep} = await signUp({
//         username: values.email,
//         password: values.password,
//         options: {
//           userAttributes: {
//             email: values.email,
//             phone_number: combinedPhoneNumber,
//             name: values.nickname,
//             'custom:type': 'Admin',
//             'custom:countryCode': `${selectedCountryCode}`,
//             'custom:phoneNumber': `${phoneNumberWithoutCountryCode}`
//           },
//           autoSignIn: true
//         }
//       });
//       console.log('SignUp complete:', isSignUpComplete);
//       console.log('User ID:', userId);

//       navigate(`/verification-otp?email=${encodeURIComponent(values.email)}`);
//     } catch (error) {
//       console.error('Error signing up:', error);
//       setErrors({email: error.message});
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <MaterialCommunityIcons name='arrow-left' size={24} color='#000' />
//         </TouchableOpacity>
//         <Text style={styles.title}>Sign Up</Text>
//         <Text style={styles.subtitle}>Create an account and enjoy all services!</Text>
//       </View>

//       <Formik
//         initialValues={{
//           nickname: '',
//           email: '',
//           phone: '',
//           password: '',
//           confirmPassword: '',
//           termsAccepted: false
//         }}
//         validationSchema={SignUpSchema}
//         onSubmit={handleSignup}>
//         {({handleChange, handleSubmit, values, errors, touched, setFieldValue, isSubmitting, isValid, dirty}) => (
//           <View style={styles.form}>
//             <MyField
//               label='Nickname'
//               placeholder='Full name'
//               value={values.nickname}
//               onChange={handleChange('nickname')}
//               error={errors.nickname}
//               touched={touched.nickname}
//             />
//             <MyField
//               label='Email'
//               placeholder='Email address'
//               value={values.email}
//               onChange={handleChange('email')}
//               error={errors.email}
//               touched={touched.email}
//             />
//             <MyField
//               label='Phone Number'
//               placeholder='Enter phone number'
//               value={values.phone}
//               onChange={handleChange('phone')}
//               error={errors.phone}
//               touched={touched.phone}
//               keyboardType='phone-pad'
//               isPhoneField={true} // Enables country code selection
//               countryCode={countryCode} // Pass current country code
//               onCountryChange={(newCountryCode, newCallingCode, data) => {
//                 console.log(newCountryCode, newCallingCode, data);

//                 setCountryCode(newCountryCode);
//                 setCallingCode(`+${newCallingCode}`); // Fix: Update callingCode correctly
//               }}
//             />

//             <MyField
//               label='Password'
//               placeholder='Password'
//               value={values.password}
//               onChange={handleChange('password')}
//               secureTextEntry={!showPassword}
//               showPassword={showPassword}
//               setShowPassword={setShowPassword}
//               error={errors.password}
//               touched={touched.password}
//             />
//             <MyField
//               label='Confirm Password'
//               placeholder='Confirm Password'
//               value={values.confirmPassword}
//               onChange={handleChange('confirmPassword')}
//               secureTextEntry={!showConfirmPassword}
//               showPassword={showConfirmPassword}
//               setShowPassword={setShowConfirmPassword}
//               error={errors.confirmPassword}
//               touched={touched.confirmPassword}
//             />

//             <View style={styles.termsContainer}>
//               <Checkbox
//                 value={values.termsAccepted}
//                 onValueChange={(value) => setFieldValue('termsAccepted', value)}
//                 color={values.termsAccepted ? '#65100D' : undefined}
//                 style={styles.checkbox}
//               />
//               <Text style={styles.termsText}>
//                 I agree to the company's
//                 <Text style={styles.link}> Term of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
//               </Text>
//             </View>
//             {touched.termsAccepted && errors.termsAccepted && (
//               <Text style={styles.errorText}>{errors.termsAccepted}</Text>
//             )}

//             <TouchableOpacity
//               style={[
//                 styles.signUpButton,
//                 {
//                   backgroundColor: '#65100D',
//                   opacity: isValid && dirty ? 1 : 0.6
//                 }
//               ]}
//               onPress={handleSubmit}
//               disabled={!(isValid && dirty) || isSubmitting}>
//               {isSubmitting ? (
//                 <ActivityIndicator size='small' color='#FFF' />
//               ) : (
//                 <Text style={styles.signUpButtonText}>Sign Up</Text>
//               )}
//             </TouchableOpacity>

//             <View style={styles.loginContainer}>
//               <Text style={styles.loginText}>Have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('login')}>
//                 <Text style={styles.loginLink}>Login</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </Formik>
//     </ScrollView>
//   );
// }

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import MyField from '../../../components/shared/MyField';
import {signUp} from 'aws-amplify/auth';
import {ActivityIndicator} from 'react-native';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [countryCode, setCountryCode] = useState('US'); // Default country
  const [callingCode, setCallingCode] = useState('1'); // Default calling code without +
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignup = async (values, {setSubmitting, setErrors}) => {
    try {
      const combinedPhoneNumber = `+${callingCode}${values.phone.replace(/\D/g, '')}`;

      const {isSignUpComplete, userId, nextStep} = await signUp({
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

      navigation.navigate('verifyOtp', {email: values.email, from: 'signup'});
    } catch (error) {
      setErrors({email: error.message});
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
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
        onSubmit={handleSignup}>
        {({handleChange, handleSubmit, values, errors, touched, setFieldValue, isSubmitting, isValid, dirty}) => (
          <View style={styles.form}>
            <MyField
              label='Nickname'
              placeholder='Full name'
              value={values.nickname}
              onChange={handleChange('nickname')}
              error={errors.nickname}
              touched={touched.nickname}
            />
            <MyField
              label='Email'
              placeholder='Email address'
              value={values.email}
              onChange={handleChange('email')}
              error={errors.email}
              touched={touched.email}
            />
            <MyField
              label='Phone Number'
              placeholder='Enter phone number'
              value={values.phone}
              onChange={(text) => {
                handleChange('phone')(text);
                handlePhoneChange(text);
              }}
              error={errors.phone}
              touched={touched.phone}
              keyboardType='phone-pad'
              isPhoneField={true}
              countryCode={countryCode}
              callingCode={callingCode}
              onCountryChange={(newCountryCode) => {
                setCountryCode(newCountryCode);
              }}
              onCallingCodeChange={(newCallingCode) => {
                setCallingCode(newCallingCode);
              }}
            />
            <Text>Selected Country Code: +{callingCode}</Text>
            <Text>Entered Phone Number: {phoneNumber}</Text>

            <MyField
              label='Password'
              placeholder='Password'
              value={values.password}
              onChange={handleChange('password')}
              secureTextEntry={!showPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={errors.password}
              touched={touched.password}
            />
            <MyField
              label='Confirm Password'
              placeholder='Confirm Password'
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              secureTextEntry={!showConfirmPassword}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <View style={styles.termsContainer}>
              <Checkbox
                value={values.termsAccepted}
                onValueChange={(value) => setFieldValue('termsAccepted', value)}
                color={values.termsAccepted ? '#65100D' : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.termsText}>
                I agree to the company's
                <Text style={styles.link}> Term of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
              </Text>
            </View>
            {touched.termsAccepted && errors.termsAccepted && (
              <Text style={styles.errorText}>{errors.termsAccepted}</Text>
            )}

            <TouchableOpacity
              style={[
                styles.signUpButton,
                {
                  backgroundColor: '#65100D',
                  opacity: isValid && dirty ? 1 : 0.6
                }
              ]}
              onPress={handleSubmit}
              disabled={!(isValid && dirty) || isSubmitting}>
              {isSubmitting ? (
                <ActivityIndicator size='small' color='#FFF' />
              ) : (
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}
