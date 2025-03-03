import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  content: {
    padding: 24,
    flexDirection: 'column',
    gap: 40,
    alignItems: 'center'
  },
  successContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBorder: {
    borderWidth: 4,
    borderColor: '#4CAF50',
    borderRadius: 40,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#444',
    marginBottom: 12,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    opacity: 0.8,
    textAlign: 'center',
    lineHeight: 20
  },
  loginButton: {
    backgroundColor: '#C67C4E',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%'
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400'
  }
});
