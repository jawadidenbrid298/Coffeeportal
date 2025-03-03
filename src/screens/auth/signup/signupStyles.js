import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
  header: {padding: 20, paddingTop: 40},
  backButton: {marginBottom: 24, height: 50, width: 50},
  title: {fontSize: 24, fontWeight: '400', color: '#313131', marginBottom: 8},
  subtitle: {fontSize: 16, fontWeight: '400', color: '#666'},
  form: {padding: 20},
  // MyField's styles for label, inputContainer, and input remain as defined in your project
  termsContainer: {flexDirection: 'row', alignItems: 'center', marginVertical: 24},
  checkbox: {marginRight: 8, borderColor: 'rgba(209, 213, 219, 1)', borderRadius: 6},
  termsText: {flex: 1, color: '#666', fontSize: 14},
  link: {color: '#65100D', textDecorationLine: 'underline'},
  signUpButton: {
    backgroundColor: '#009688',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  signUpButtonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  loginContainer: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
  loginText: {color: 'rgba(156, 163, 175, 1)', fontSize: 16, fontWeight: '400'},
  loginLink: {color: '#65100D', fontSize: 16, fontWeight: '400', textDecorationLine: 'underline'},
  errorText: {color: 'red', fontSize: 12},
  countryPickerContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#ccc',
    paddingRight: 8
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
