import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import { UserContext } from '../UserContext';

export default function Login({ navigation }) {
  // const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo2.png')} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          navigation.navigate('AllTabs', {
            screen: 'UserProfile',
          });
        }}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signUp_button}>
          Don't have an account yet?{' '}
          <Text style={styles.underline}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe5d9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 70,
    width: 305,
    height: 105,
  },

  inputView: {
    backgroundColor: '#ece4db',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    textDecorationLine: 'underline',
  },

  signUp_button: {
    height: 30,
    marginTop: 30,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#d8e2dc',
  },

  underline: {
    textDecorationLine: 'underline',
  },
});
