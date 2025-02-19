import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';

export default function CountdownTimer({initialSeconds, onComplete}) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return <Text style={styles.text}>Resend code in {formatTime(seconds)}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: '#H6H6H6',
    textAlign: 'center',
    opacity: 0.8,
    fontSize: 14
  }
});
