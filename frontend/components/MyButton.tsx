import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';

type MyButtonProps = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
};

const MyButton: React.FC<MyButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4facfe',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
