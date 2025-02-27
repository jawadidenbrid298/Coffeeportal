import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5'
  },
  header: {
    flexDirection: 'row',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  successMessage: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    zIndex: 1
  },
  successText: {
    color: 'white',
    fontWeight: 'bold'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#555',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10
  },
  button: {
    marginTop: 10,
    backgroundColor: '#C67C4E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    marginTop: 20
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  dropdownContainer: {
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 5,
    elevation: 2
  },
  signout: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end'
  }
});
