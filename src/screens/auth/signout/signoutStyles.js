import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  signOutButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B91C1C',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'space-between'
  },

  signOutText: {
    fontSize: 20,
    color: 'white',

    fontWeight: 'bold'
  }
});
