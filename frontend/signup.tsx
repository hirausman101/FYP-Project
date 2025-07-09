import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Simple validation
  const isNameValid = name.length > 1;
  const isEmailValid = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isPasswordValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password);

  // Replace Alert.alert with this function
  const showCustomAlert = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (!isNameValid) return showCustomAlert("Please enter a valid name.");
    if (!isEmailValid) return showCustomAlert("Please enter a valid email address.");
    if (!isPasswordValid) return showCustomAlert("Password must be at least 6 characters long and include uppercase, lowercase, and a digit.");

    const userData = { name, email, password, userType: "Caregiver" };

    axios.post(`${API_BASE_URL}/register`, userData, {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    })
      .then(res => {
        if (res.data.status === 'ok') {
          showCustomAlert('Registered Successfully!!');
          setTimeout(() => {
            setModalVisible(false);
            navigation.replace('Login');
          }, 1200);
        } else {
          showCustomAlert('Registration failed. Please try again.');
        }
      })
      .catch(error => {
        if (error.response?.data?.error) {
          showCustomAlert(error.response.data.error);
        } else if (error.message) {
          showCustomAlert(error.message);
        } else {
          showCustomAlert("Something went wrong. Please try again later.");
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
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    minWidth: 220,
  },
  modalText: {
    fontSize: 14, // Smaller text size
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    color: '#8a61c7',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
});