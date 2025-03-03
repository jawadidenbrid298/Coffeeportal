import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  content: {flex: 1, padding: 20},
  backButton: {marginBottom: 24},
  header: {marginBottom: 32},
  title: {fontSize: 24, fontWeight: '400', color: 'rgba(17, 24, 39, 1)', marginBottom: 8},
  subtitle: {fontSize: 16, color: 'rgba(156, 163, 175, 1)', fontWeight: '400'},
  form: {flex: 1},
  errorText: {color: '#ff6b6b', fontSize: 14, marginTop: 12},
  confirmButton: {
    backgroundColor: '#009688',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto'
  },
  confirmButtonText: {color: '#fff', fontSize: 16, fontWeight: '400'}
});
