import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  topSection: {
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20
  },
  userInfoContainer: {
    position: 'absolute',
    top: 39,
    left: 16
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 27.28
  },
  phone: {
    fontSize: 20,
    color: 'gray',
    lineHeight: 27.28
  },

  statsGrid: {
    marginTop: 57,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 50,
    width: '100%'
  },
  statBox: {
    flex: 1,
    alignItems: 'center'
  },
  icon: {
    width: 42,
    height: 35,
    resizeMode: 'contain'
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '400',
    marginTop: 8
  },
  statLabel: {
    fontSize: 14,
    color: 'brown',
    marginTop: 2
  },
  divider: {
    width: 1,
    height: 80,
    backgroundColor: 'gray'
  },

  bottomSection: {
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%'
  },

  animatedCircleContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -110}, {translateY: -110}] // Half of the circle size to center it
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  circleIcon: {
    height: 31.35,
    width: 31.35,
    resizeMode: 'contain'
  },

  circleNumber: {
    fontSize: 40,

    fontWeight: '400',
    color: '#fff'
  },
  circleLabel: {
    top: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: '#ffff'
  }
});
export default styles;
