import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {confirmResetPassword} from 'aws-amplify/auth';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import MyField from '../../../components/shared/MyField';
import {styles} from './resetPasswordStyles';

const NewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password must contain at least 1 number')
    .matches(/[a-zA-Z]/, 'Password must contain at least 1 letter')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
});

export default function NewPassword({navigation, route}) {
  const email = route.params?.email || 'test@mail.com';
  const otp = route.params?.otp || '';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (values) => {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: otp,
        newPassword: values.password
      });

      navigation.navigate('passwordChanged');
    } catch (error) {
      setErrorMessage(error.message || 'Error resetting password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name='arrow-left' size={24} color='#000' />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>New Password</Text>
          <Text style={styles.subtitle}>Create a new password that is safe and easy to remember</Text>
        </View>

        <Formik
          initialValues={{password: '', confirmPassword: ''}}
          validationSchema={NewPasswordSchema}
          onSubmit={handleResetPassword}>
          {({handleSubmit, values, errors, touched, handleChange, handleBlur, isValid, dirty}) => (
            <View style={styles.form}>
              <MyField
                label='New Password'
                placeholder='Enter new password'
                value={values.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                icon='lock-outline'
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
                onBlur={handleBlur('confirmPassword')}
                icon='lock-outline'
                secureTextEntry={!showConfirmPassword}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
              />

              {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
              <TouchableOpacity
                style={[styles.confirmButton, {backgroundColor: '#65100D', opacity: isValid && dirty ? 1 : 0.6}]}
                onPress={handleSubmit}
                disabled={!(isValid && dirty) || loading}>
                {loading ? (
                  <ActivityIndicator size='small' color='#fff' />
                ) : (
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

// import React, {useState} from 'react';
// import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
// import {Formik} from 'formik';
// import * as Yup from 'yup';
// import {confirmResetPassword} from 'aws-amplify/auth';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
// import MyField from '../../../components/shared/MyField';
// import {styles} from './resetPasswordStyles';

// const NewPasswordSchema = Yup.object().shape({
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .matches(/[0-9]/, 'Password must contain at least 1 number')
//     .matches(/[a-zA-Z]/, 'Password must contain at least 1 letter')
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords must match')
//     .required('Confirm password is required')
// });

// export default function NewPassword({navigation, route}) {
//   const email = route.params?.email || 'test@mail.com';
//   const otp = route.params?.otp || '';

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleResetPassword = async (values) => {
//     try {
//       await confirmResetPassword({
//         username: email,
//         confirmationCode: otp,
//         newPassword: values.password
//       });

//       navigation.navigate('passwordChanged');
//     } catch (error) {
//       setErrorMessage(error.message || 'Error resetting password');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <MaterialCommunityIcons name='arrow-left' size={24} color='#000' />
//         </TouchableOpacity>

//         <View style={styles.header}>
//           <Text style={styles.title}>New Password</Text>
//           <Text style={styles.subtitle}>Create a new password that is safe and easy to remember</Text>
//         </View>

//         <Formik
//           initialValues={{password: '', confirmPassword: ''}}
//           validationSchema={NewPasswordSchema}
//           onSubmit={handleResetPassword}>
//           {({handleSubmit, values, errors, touched, handleChange, handleBlur}) => (
//             <View style={styles.form}>
//               <MyField
//                 label='New Password'
//                 placeholder='Enter new password'
//                 value={values.password}
//                 onChange={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 icon='lock-outline'
//                 secureTextEntry={!showPassword}
//                 showPassword={showPassword}
//                 setShowPassword={setShowPassword}
//                 error={errors.password}
//                 touched={touched.password}
//               />

//               <MyField
//                 label='Confirm Password'
//                 placeholder='Confirm Password'
//                 value={values.confirmPassword}
//                 onChange={handleChange('confirmPassword')}
//                 onBlur={handleBlur('confirmPassword')}
//                 icon='lock-outline'
//                 secureTextEntry={!showConfirmPassword}
//                 showPassword={showConfirmPassword}
//                 setShowPassword={setShowConfirmPassword}
//                 error={errors.confirmPassword}
//                 touched={touched.confirmPassword}
//               />

//               {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

//               <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
//                 <Text style={styles.confirmButtonText}>Confirm</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </Formik>
//       </View>
//     </SafeAreaView>
//   );
// }
