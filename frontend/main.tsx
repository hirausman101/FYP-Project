import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

function Index() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigation.navigate('Login');
    }, 7000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Caregiver App</Text>
      <Text style={styles.subtitle}>Welcome to the caregiver platform</Text>
      <View style={styles.bottomContainer}>
        {/* Loading indicator absolutely at the bottom */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
        <Svg
          width={width}
          height={height * 0.3}
          viewBox={`0 0 ${width} ${height * 0.3}`}
          style={styles.wave}
        >
          <Path
            fill="#7dadfa"
            d={`M0,${height * 0.05} C${width / 2},${height * 0.25} ${width / 2},0 ${width},${height * 0.05} L${width},${height * 0.3} L0,${height * 0.3} Z`}
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 220, height: 200, marginBottom: 50 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2a4fbf', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  loadingText: {
    marginTop: 5,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Index;