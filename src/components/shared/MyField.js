// import React, {useState, useEffect} from 'react';
// import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
// import CountryPicker from 'react-native-country-picker-modal';
// import PasswordValidation from './PasswordValidation';

// const MyField = ({
//   label,
//   placeholder,
//   value,
//   onChange,
//   onBlur,
//   icon,
//   secureTextEntry = false,
//   error,
//   touched,
//   keyboardType = 'default',
//   autoCapitalize = 'none',
//   isPhoneField = false,
//   countryCode, // Prop from parent
//   onCountryChange // Callback to update parent state
// }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [selectedCountry, setSelectedCountry] = useState(countryCode || 'US');
//   const [callingCode, setCallingCode] = useState('');
//   const [visible, setVisible] = useState(false);

//   // Update callingCode when countryCode prop changes
//   useEffect(() => {
//     if (countryCode) {
//       setSelectedCountry(countryCode);
//     }
//   }, [countryCode]);

//   return (
//     <View>
//       <Text style={styles.label}>{label}</Text>
//       <View style={styles.inputContainer}>
//         {icon && <MaterialCommunityIcons name={icon} size={24} color={value ? '#65100D' : '#666'} />}

//         {isPhoneField && (
//           <Pressable onPress={() => setVisible(true)} style={styles.countryPicker}>
//             <CountryPicker
//               withFilter
//               withFlag
//               withCallingCode
//               withEmoji
//               visible={visible}
//               countryCode={selectedCountry}
//               onSelect={(country) => {
//                 setSelectedCountry(country.cca2);
//                 setCallingCode(country.callingCode?.[0] || '');
//                 onCountryChange && onCountryChange(country.cca2);
//               }}
//               onClose={() => setVisible(false)}
//             />
//             <Text style={styles.callingCode}>+{callingCode}</Text>
//           </Pressable>
//         )}

//         <TextInput
//           style={styles.input}
//           placeholder={placeholder}
//           value={value}
//           onChangeText={onChange}
//           onBlur={onBlur}
//           secureTextEntry={secureTextEntry && !showPassword}
//           keyboardType={keyboardType}
//           autoCapitalize={autoCapitalize}
//         />

//         {secureTextEntry && (
//           <Pressable onPress={() => setShowPassword(!showPassword)}>
//             <MaterialCommunityIcons
//               name={showPassword ? 'eye-off-outline' : 'eye-outline'}
//               size={24}
//               color={value ? '#65100D' : '#666'}
//             />
//           </Pressable>
//         )}
//       </View>

//       {secureTextEntry && <PasswordValidation password={value} />}
//       {touched && error && <Text style={styles.errorText}>{error}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   label: {
//     fontSize: 14,
//     fontWeight: '400',
//     color: '#666',
//     marginBottom: 8
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(229, 231, 235, 1)',
//     borderRadius: 12,
//     marginBottom: 16,
//     height: 48,
//     width: '100%',
//     paddingHorizontal: 12,
//     backgroundColor: 'white',
//     gap: 10
//   },
//   countryPicker: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     paddingRight: 5
//   },
//   callingCode: {
//     fontSize: 16,
//     color: '#333',
//     fontWeight: '600'
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333'
//   },
//   errorText: {
//     color: '#ff3333',
//     fontSize: 12,
//     marginTop: -8,
//     marginBottom: 16,
//     marginLeft: 4
//   }
// });

// export default MyField;

import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import CountryPicker from 'react-native-country-picker-modal';
import PasswordValidation from './PasswordValidation';

const MyField = ({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  icon,
  secureTextEntry = false,
  error,
  touched,
  keyboardType = 'default',
  autoCapitalize = 'none',
  isPhoneField = false,
  countryCode, // Prop from parent
  onCountryChange, // Callback to update parent state
  callingCode, // Prop from parent
  onCallingCodeChange // Callback to update parent calling code
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCode || 'US');
  const [localCallingCode, setLocalCallingCode] = useState(callingCode || '');
  const [visible, setVisible] = useState(false);

  // Update selectedCountry and localCallingCode when props change
  useEffect(() => {
    if (countryCode) {
      setSelectedCountry(countryCode);
    }
    if (callingCode) {
      setLocalCallingCode(callingCode);
    }
  }, [countryCode, callingCode]);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <MaterialCommunityIcons name={icon} size={24} color={value ? '#65100D' : '#666'} />}

        {isPhoneField && (
          <Pressable onPress={() => setVisible(true)} style={styles.countryPicker}>
            <CountryPicker
              withFilter
              withFlag
              withCallingCode
              withEmoji
              visible={visible}
              countryCode={selectedCountry}
              onSelect={(country) => {
                setSelectedCountry(country.cca2);
                const newCallingCode = country.callingCode?.[0] || '';
                setLocalCallingCode(newCallingCode);
                onCountryChange && onCountryChange(country.cca2);
                onCallingCodeChange && onCallingCodeChange(newCallingCode);
              }}
              onClose={() => setVisible(false)}
            />
            <Text style={styles.callingCode}>+{localCallingCode}</Text>
          </Pressable>
        )}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />

        {secureTextEntry && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={value ? '#65100D' : '#666'}
            />
          </Pressable>
        )}
      </View>

      {secureTextEntry && <PasswordValidation password={value} />}
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1)',
    borderRadius: 12,
    marginBottom: 16,
    height: 48,
    width: '100%',
    paddingHorizontal: 12,
    backgroundColor: 'white',
    gap: 10
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingRight: 5
  },
  callingCode: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600'
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333'
  },
  errorText: {
    color: '#ff3333',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 16,
    marginLeft: 4
  }
});

export default MyField;
