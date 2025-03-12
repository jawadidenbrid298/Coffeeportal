import React from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';

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
    fontSize: 22,
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
    color: '#550000',
    marginTop: 2,
    lineHeight: 17.73
  },
  divider: {
    width: 1,
    height: 80,
    backgroundColor: '#B1B1B1'
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
    transform: [{translateX: -110}, {translateY: -110}]
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 5
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
    width: 42,
    height: 42,
    resizeMode: 'contain'
  },

  circleNumber: {
    fontSize: 40,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    includeFontPadding: false,
    height: 42,
    lineHeight: 42,
    textAlignVertical: 'center',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3
  },

  circleLabel: {
    top: 20,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: '#ffff'
  },

  dropdownMenu: {
    position: 'absolute',
    top: 62,
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    width: 160,
    zIndex: 1000
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9'
  },

  dropdownText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default styles;
