// Styles.js
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 30,
  },
  titleContainer: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300',
    color: 'gray',
    marginBottom: 20,
  },
  inputContainer: {
    width: '90%', // Set the width to 90% of the container
    alignSelf: 'center', // Align the container center horizontally
    marginBottom: 16, // Add margin bottom for spacing
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    paddingLeft: 8,
    backgroundColor: '#e6e3e1',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  loginText: {
    fontSize: 26,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  loginButton: {
    backgroundColor: 'green', // Adjust the color based on your design
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20, // Adjust the margin based on your design
    width: '90%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  registertext: {
    color: 'green',
    fontWeight: '400',
    marginLeft: 5,
  },
});

export default styles;
