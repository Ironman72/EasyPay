// styles.js
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    gap: 10,
  },

  button: {
    width: '90%',
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    elevation: 1,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
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
    height: 30,
    width: 30,
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
