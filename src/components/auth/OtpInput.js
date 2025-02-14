import React, {useRef, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

export default function OtpInput({length, value, onChange, hasError}) {
  const inputRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleChange = (text, index) => {
    const newValue = value.split('');
    newValue[index] = text;
    onChange(newValue.join(''));

    if (text.length > 0 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0 && !value[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  return (
    <View style={styles.container}>
      {[...Array(length)].map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            if (ref) inputRefs.current[index] = ref;
          }}
          style={[styles.input, focusedIndex === index && styles.focused, hasError && styles.errorInput]}
          maxLength={1}
          keyboardType='number-pad'
          value={value[index] || ''}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          onFocus={() => handleFocus(index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  focused: {
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  errorInput: {
    borderColor: 'red'
  }
});
