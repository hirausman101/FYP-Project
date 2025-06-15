import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Feather from 'react-native-vector-icons/Feather';
import MyButton from './components/MyButton';
import API_BASE_URL from './config';


function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

async function handleSubmit() {
  try {
    const res = await axios.post(`${API_BASE_URL}/login-user`, { email, password }, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    if (res.data.status === 'ok') {
      await AsyncStorage.setItem("token", res.data.data); // Store the token from backend
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
      await AsyncStorage.setItem('userType', res.data.userType);
      Alert.alert('Logged In Successfully');
      // Pass email and id as params
      navigation.navigate('Dashboard', {
        email: res.data.email || email,
        id: res.data._id || res.data.id // Use id from response if available
      });
    } else {
      Alert.alert('Login failed', 'Invalid response from server');
    }
  } catch (err: any) {
    Alert.alert('Login failed', err.response?.data?.error || 'Please check your credentials and try again.');
  }
}
 const handleForgotPassword = () => {
  if (!email) {
    alert("Please enter your email");
    return;
  }
  axios.post(`${API_BASE_URL}/forgot-password`, { email }, {
    headers: { 'ngrok-skip-browser-warning': 'true' }
  })
    .then(res => {
      alert(res.data.message || "Check your email");
      navigation.navigate('ResetPassword', { email });
    })
    .catch((err) => {
      // Show backend error message if available
      alert(err.response?.data?.error || err.message || "Error sending email");
    });
};

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('./assets/care.png')} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
      </View>
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
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <MyButton title="Login" onPress={handleSubmit} />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
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
    
  },
  passwordContainer: {
    flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingHorizontal: 12,
  marginBottom: 16,
  paddingRight:50,
},
  eyeIcon: {
    marginRight:1,
  },
  inputField: {
  flex: 1,
  paddingVertical: 12,
},
  link: {
    marginTop: 20,
    color: '#4facfe',
    textAlign: 'center',
  },
  forgotPassword: {
  color: '#3A59D1',
  textAlign: 'right',
  marginBottom: 12,
  fontSize: 14,
},
 logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
   
  },
  logoContainer: {
    alignItems: 'center', // Only center logo and title
    marginBottom: 20,
  },
});


