import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    maxWidth: 700,
    // alignItems:"center",
    // justifyContent:"center",
    padding: 20
  },
  header: {
    marginTop: 60,
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#313131',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400'
  },
  form: {
    width: '100%'
  },
  forgotPassword: {
    color: '#65100D',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 24,
    textDecorationLine: 'underline'
  },
  loginButton: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    flexDirection: 'row'
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1)',
    borderRadius: 12,
    marginBottom: 16,
    height: 48,
    width: '100%',
    gap: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white'
  },
  input: {
    fontSize: 16,
    color: '#333'
  },
  passwordInput: {
    width: '100%',
    marginRight: 8
  },
  errorText: {
    color: '#ff3333',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 4
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupText: {
    color: '#313131',
    fontSize: 14
  },
  signupLink: {
    color: '#65100D',
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline'
  },
  landingPageLink: {
    color: '#65100D',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 16
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{translateY: -12}],
    zIndex: 1
  }
});
