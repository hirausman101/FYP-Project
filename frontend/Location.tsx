import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import API_BASE_URL from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Location = ({route}) => {
  const { patientId } = route.params;
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchLocation = useCallback(async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      console.log('Fetching location for patient:', patientId, 'with token:', token);
      const res = await fetch(`${API_BASE_URL}/location/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) {
        console.error('Failed to fetch location:', res.status);
        setLoading(false);
        return null;
      }
      const data = await res.json();
      if (data && data.latitude && data.longitude) {
        setLocation({ latitude: data.latitude, longitude: data.longitude });
        console.log('Current location:', data);
      } else {
        console.warn('No valid location data received:', data);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching location:', err);
      setLoading(false);
    }
  }, [patientId]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  if (!location || loading) {
    console.log('Waiting for location data...');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Button title="Refresh Location" onPress={fetchLocation} />
      </View>
    );
  }

  console.log('Rendering map with location:', location);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={location} title="Users Last Location"></Marker>
      </MapView>
      <Button title="Refresh Location" onPress={fetchLocation} />
    </View>
  );
};

export default Location;