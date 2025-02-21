import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollViewContent: {flexGrow: 1},
  imageBackground: {width: width * 1, height: height * 0.5, resizeMode: 'cover'},
  topSection: {height: height * 0.5, justifyContent: 'center', alignItems: 'center', width: '100%'},
  nameContainer: {flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 20, left: 20},
  greeting: {fontSize: 24, fontWeight: 'bold', color: '#f8f8f8', flex: 'wrap'},
  phone: {position: 'absolute', top: 60, left: 20, fontSize: 16, color: '#f8f8f8'},
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 5,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  dropdownItem: {flexDirection: 'row', alignItems: 'center', paddingVertical: 10},
  dropdownText: {fontSize: 16, color: '#800000', marginLeft: 10},
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    width: '100%'
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FECACA'
  },
  cardText: {color: '#6F0023', fontSize: 16, textAlign: 'center'},
  readingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FECACA',
    borderRadius: 20,
    position: 'absolute',
    top: 20,
    right: 20,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '47%'
  },
  textContainer: {flexDirection: 'row', alignItems: 'center'},
  readingText: {fontSize: 24, fontWeight: 'bold', color: '#9B1C1C', marginLeft: 1},
  divider: {width: 2, height: '60%', backgroundColor: '#A67C00', marginHorizontal: 5},
  imageWrapper: {position: 'absolute', right: -10, top: -15, zIndex: 2},
  coffeeImage: {width: 60, height: 75},
  bottomSection: {width: '100%', marginTop: 20, alignItems: 'center'},
  brewedText: {fontSize: 18, fontWeight: 'bold', color: '#800000', marginBottom: 10, alignSelf: 'flex-start'},
  imageCard: {width: '100%', borderRadius: 20, marginBottom: 20, overflow: 'hidden'},
  image: {width: '100%', height: 150},
  imageText: {
    marginTop: 10,
    fontSize: 20,
    color: '#800000',
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 10,
    fontWeight: 'bold'
  },
  nationText: {fontSize: 16, color: 'black', textAlign: 'left', width: '100%', paddingHorizontal: 10},
  firstDigit: {fontSize: 32, color: '#9B1C1C', fontWeight: 'bold', marginLeft: 1},
  secondDigit: {fontSize: 24, marginLeft: 1, color: '#9B1C1C', fontWeight: 'bold'}
});

export default styles;
