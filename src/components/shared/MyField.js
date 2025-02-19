import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
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
  autoCapitalize = 'none'
}) => {
  const [showPassword, setShowPassword] = useState(false); // Local state for visibility toggle

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <MaterialCommunityIcons name={icon} size={24} color={value ? '#C67C4E' : '#666'} />}

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry && !showPassword} // Fix: Ensure correct behavior
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />

        {secureTextEntry && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color={value ? '#C67C4E' : '#666'}
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
    width:"100%",
    paddingHorizontal: 12,
    backgroundColor: 'white',
    gap: 16
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
