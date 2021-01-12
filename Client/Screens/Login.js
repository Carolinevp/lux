// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { Button } from 'react-native-elements';
// import { TextInput } from 'react-native';

// const Login = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Image style={styles.logo} source={require('./logo.png')} />
//       <TextInput style={styles.input} placeholder="Email" />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry={true}
//       />
//       <View style={styles.signIn}>
//         <Button
//           title="Sign in"
//           type="outline"
//           style={styles.button}
//           onPress={() => {
//             navigation.navigate('AllTabs', { screen: 'UserProfile' });
//           }}
//         />
//         <Text>Forget password?</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     borderColor: 'grey',
//     borderWidth: 1,
//     borderRadius: 30,
//     padding: 10,
//   },
//   container: {
//     padding: 10,
//     backgroundColor: 'white',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     borderRadius: 30,
//     height: 40,
//     backgroundColor: 'teal',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   textButton: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   logo: {
//     width: 300,
//     height: 105,
//     marginBottom: 40,
//   },
//   signIn: {
//     padding: 5,
//   },
// });

// export default Login;

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./logo2.png')} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(Email) => setEmail(Email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(Password) => setPassword(Password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          navigation.navigate('AllTabs', { screen: 'UserProfile' });
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
