import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import API_BASE_URL from "./config";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
    } catch (err) {
      setMessage('Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Reset Code"
        value={code}
        onChangeText={setCode}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        secureTextEntry
        placeholder="New password"
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <Button title="Reset Password" onPress={handleSubmit} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 16 },
  message: { marginTop: 16, textAlign: 'center', color: 'red' },
});