import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    padding: 20
  },
  backButton: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    opacity: 0.8,
    marginBottom: 40,
    lineHeight: 20
  },
  form: {
    alignItems: 'center'
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
    marginTop: 12
  },
  timerContainer: {
    marginTop: 24,
    marginBottom: 40
  },
  resendText: {
    color: '#65100D',
    fontSize: 14,
    textDecorationLine: 'underline'
  },
  continueButton: {
    backgroundColor: '#65100D',
    borderRadius: 8,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  disabledButton: {
    opacity: 0.7
  }
});
