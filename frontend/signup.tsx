import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import MyButton from './components/MyButton';
import API_BASE_URL from './config';

function Signup() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Simple validation
  const isNameValid = name.length > 1;
  const isEmailValid = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isPasswordValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);

  const handleSubmit = () => {
    if (!isNameValid) return Alert.alert("Please enter a valid name.");
    if (!isEmailValid) return Alert.alert("Please enter a valid email address.");
    if (!isPasswordValid) return Alert.alert("Password must be at least 6 characters long and include uppercase, lowercase, and a digit.");

    const userData = { name, email, password, userType: "Caregiver" };

    axios.post(`${API_BASE_URL}/register`, userData, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then(res => {
        if (res.data.status === 'ok') {
          Alert.alert('Registered Successfully!!');
          navigation.replace('Login');
        } else {
          Alert.alert('Registration failed. Please try again.');
        }
      })
      .catch(error => {
        if (error.response?.data?.error) {
          Alert.alert("Error", error.response.data.error);
        } else if (error.message) {
          Alert.alert("Error", error.message);
        } else {
          Alert.alert("Error", "Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/signup.jpg')} style={styles.logo} />
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.inputField}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="grey"
            style={styles.eyeicon}
          />
        </TouchableOpacity>
      </View>
      <MyButton title="Sign Up" onPress={handleSubmit} color="#8a61c7" />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    paddingRight: 10,
  },
  link: {
    marginTop: 20,
    color: '#a97af0',
    textAlign: 'center',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    paddingRight: 50,
  },
  inputField: {
    flex: 1,
    paddingVertical: 12,
  },
  eyeicon: {
    marginRight: 0,
  },
  logo: {
    marginTop:30,
    width: 230,
    height: 230,
    marginBottom: 50,
    resizeMode: 'contain',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});