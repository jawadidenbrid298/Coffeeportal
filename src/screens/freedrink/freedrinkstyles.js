import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 30
  },

  card: {
    width: '100%',
    height: 125,
    borderRadius: 20,
    backgroundColor: 'transparent',
    elevation: 0,
    borderColor: 'transparent',
    position: 'absolute',
    zIndex: 10,
    overflow: 'hidden'
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 11
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10
  },

  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    padding: 20
  },

  leftStack: {
    flex: 4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 20
  },

  countText: {
    fontSize: 18,
    fontWeight: '400',
    color: 'white',
    lineHeight: 24.55
  },
  drinkText: {
    fontSize: 48,
    color: '#F35C00'
  },

  rightStack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginRight: 20
  },

  rewardImage: {
    width: 180,
    height: 110,
    resizeMode: 'contain'
  }
});

export default styles;
