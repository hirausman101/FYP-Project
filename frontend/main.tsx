import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

function Index() {
  const navigation = useNavigation();

  const onContinue = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/care.png')} style={styles.logo} />
      <Text style={styles.title}>Caregiver App</Text>
      <Text style={styles.subtitle}>Welcome to the caregiver platform</Text>
      <View style={styles.bottomContainer}>
        <Svg
          width={width}
          height={height * 0.3}
          viewBox={`0 0 ${width} ${height * 0.3}`}
          style={styles.wave}
        >
          <Path
            fill="#4facfe"
            d={`M0,${height * 0.05} C${width / 2},${height * 0.25} ${width / 2},0 ${width},${height * 0.05} L${width},${height * 0.3} L0,${height * 0.3} Z`}
          />
        </Svg>
        <TouchableOpacity style={styles.button} onPress={onContinue}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  wave: {
    position: 'absolute',
    bottom: 50,
  },
  button: {
    backgroundColor: '#4facfe',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 50,
    zIndex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});