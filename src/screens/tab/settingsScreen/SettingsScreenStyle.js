import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  backButton: {marginBottom: 10},
  header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20},
  headerText: {fontSize: 24, fontWeight: 'bold', paddingBottom: 1},
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    overflow: 'hidden'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15
  },
  label: {fontSize: 20, fontWeight: 'bold'},
  dropdownContainer: {paddingVertical: 20},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
