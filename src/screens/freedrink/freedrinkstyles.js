import React from 'react';

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: -110,
    justifyContent: 'center'
  },
  rewardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'start'
  },
  card: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 5,
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    marginBottom: 10
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6F0023',
    textAlign: 'center'
  }
});

export default styles;
