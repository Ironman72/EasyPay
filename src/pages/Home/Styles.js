// styles.js
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 15,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  scanToPayButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  checkBalanceButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },

  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalCloseText: {
    marginTop: 10,
    color: 'blue',
    fontSize: 16,
  },
});

export default styles;
