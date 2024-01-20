import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'green',
    color: '#000',
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    width: '90%',
    backgroundColor: '#000',
    padding: 5,
    marginTop: 10,
    margin: 5,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  container: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
});

export default styles;
